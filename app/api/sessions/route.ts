import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { scenarioSlug, sessionId } = await req.json();

    if (!scenarioSlug || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let session = await ChatSession.findOne({ sessionId, scenarioSlug });

    if (!session) {
      session = await ChatSession.create({
        sessionId,
        scenarioSlug,
        messages: [],
      });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('[Sessions] POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const scenarioSlug = searchParams.get('scenarioSlug');

    if (!sessionId || !scenarioSlug) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const session = await ChatSession.findOne({ sessionId, scenarioSlug }).lean();
    return NextResponse.json(session ?? { messages: [] });
  } catch (error) {
    console.error('[Sessions] GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
