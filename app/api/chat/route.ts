import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Scenario from '@/models/Scenario';
import ChatSession from '@/models/ChatSession';
import { getGeminiModel, buildSystemPrompt } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[CHAT API] Request body:', JSON.stringify(body));

    // Validate fields
    const { scenarioSlug, sessionId, message, history } = body;
    if (!scenarioSlug || !sessionId || !message) {
      console.error('[CHAT API] Missing fields:', { scenarioSlug, sessionId, message });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { status: 400 }
      );
    }

    // Test MongoDB connection
    console.log('[CHAT API] Connecting to MongoDB...');
    await connectDB();
    console.log('[CHAT API] MongoDB connected');

    // Fetch scenario
    console.log('[CHAT API] Fetching scenario:', scenarioSlug);
    const scenario = await Scenario.findOne({ slug: scenarioSlug }).lean();
    console.log('[CHAT API] Scenario found:', !!scenario);
    if (!scenario) {
      return new Response(
        JSON.stringify({ error: 'Scenario not found' }), 
        { status: 404 }
      );
    }

    // Test Gemini API key
    console.log('[CHAT API] GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('[CHAT API] GEMINI_API_KEY prefix:', 
      process.env.GEMINI_API_KEY?.substring(0, 8));

    // Initialize Gemini
    console.log('[CHAT API] Initializing Gemini model...');
    const model = getGeminiModel(buildSystemPrompt(scenario as any));
    console.log('[CHAT API] Gemini model ready');

    // Build history
    const geminiHistory = (history || [])
      .slice(-10)  // max 10 previous messages
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(msg.content) }]
      }))
      .filter((msg: any) => msg.parts[0].text.trim().length > 0);
    console.log('[CHAT API] History length:', geminiHistory.length);

    // Start chat
    console.log('[CHAT API] Starting chat session...');
    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      }
    });
    console.log('[CHAT API] Chat session created');

    // Stream response
    console.log('[CHAT API] Sending message to Gemini...');
    const result = await chat.sendMessageStream([{ text: message }]);
    console.log('[CHAT API] Stream started');

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              fullResponse += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          console.log('[CHAT API] Stream complete');

          // Save complete message to ChatSession in MongoDB after stream ends
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
            console.error('[CHAT API] MongoDB Save Error:', dbError);
          }

        } catch (streamError) {
          console.error('[CHAT API] Stream error:', streamError);
          controller.error(streamError);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      }
    });

  } catch (error: any) {
    console.error('[CHAT API] Fatal error:', error);
    console.error('[CHAT API] Error name:', error?.name);
    console.error('[CHAT API] Error message:', error?.message);
    console.error('[CHAT API] Error stack:', error?.stack);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error?.message 
      }),
      { status: 500 }
    );
  }
}
