import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';
import { v4 as uuidv4 } from 'uuid';

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
    return NextResponse.json(session || { messages: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { sessionId, scenarioSlug } = await req.json();

    if (!scenarioSlug) {
      return NextResponse.json({ error: 'Missing scenario slug' }, { status: 400 });
    }

    const id = sessionId || uuidv4();
    
    let session = await ChatSession.findOne({ sessionId: id, scenarioSlug });
    
    if (!session) {
      session = await ChatSession.create({
        sessionId: id,
        scenarioSlug,
        messages: []
      });
    }

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
