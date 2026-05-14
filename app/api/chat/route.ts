import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Scenario from '@/models/Scenario';
import ChatSession from '@/models/ChatSession';
import { getGeminiModel, buildSystemPrompt } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { scenarioSlug, sessionId, message, history } = await req.json();

    // 1. Validate all required fields
    if (!scenarioSlug || !sessionId || !message || !history) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    await connectDB();

    // 2. Fetch scenario from MongoDB by slug
    const scenario = await Scenario.findOne({ slug: scenarioSlug }).lean();

    // 3. Return 404 if scenario not found
    if (!scenario) {
      return new Response(JSON.stringify({ error: 'Scenario not found' }), { status: 404 });
    }

    const model = getGeminiModel();
    const systemPrompt = buildSystemPrompt(scenario as any);

    // 5. Convert history to Gemini format
    const geminiHistory = history.map((msg: { role: 'user' | 'assistant'; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // 6. Start streaming chat session with system prompt
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I am ready to mentor you as a principal staff engineer on this production scenario." }] },
        ...geminiHistory,
      ],
    });

    // 7. Stream response using ReadableStream + TransformStream
    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            controller.enqueue(encoder.encode(chunkText));
          }

          // 8. Save complete message to ChatSession in MongoDB after stream ends
          try {
            await ChatSession.findOneAndUpdate(
              { sessionId, scenarioSlug },
              {
                $push: {
                  messages: [
                    { role: 'user', content: message, timestamp: new Date() },
                    { role: 'assistant', content: fullResponse, timestamp: new Date() },
                  ],
                },
              },
              { upsert: true }
            );
          } catch (dbError) {
            console.error('[Chat] MongoDB Save Error:', dbError);
          }
        } catch (streamError) {
          console.error('[Chat] Stream Error:', streamError);
          const errorMessage = "\n\n[System Error: Gemini stream interrupted. Please try again.]";
          controller.enqueue(encoder.encode(errorMessage));
        } finally {
          // 10. Always close stream in finally block
          controller.close();
        }
      },
    });

    // 9. Return streaming response with headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[Chat] POST Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
