import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';
import { getGeminiModel, buildSystemPrompt } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { sessionId, scenarioSlug, message, history, scenarioContext } = await req.json();

    if (!message || !scenarioSlug || !sessionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const model = getGeminiModel();
    const systemPrompt = buildSystemPrompt(
      scenarioContext.title,
      scenarioContext.problem,
      scenarioContext.realWorldExamples
    );

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I am ready to mentor you on the " + scenarioContext.title + " scenario as a senior staff engineer." }] },
        ...history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ],
    });

    const result = await chat.sendMessageStream(message);

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        
        // After stream ends, save message to DB
        try {
          await ChatSession.findOneAndUpdate(
            { sessionId, scenarioSlug },
            { 
              $push: { 
                messages: [
                  { role: 'user', content: message, timestamp: new Date() },
                  { role: 'assistant', content: fullResponse, timestamp: new Date() }
                ] 
              } 
            },
            { upsert: true }
          );
        } catch (dbError) {
          console.error('Failed to save chat to DB:', dbError);
        }
        
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
}
