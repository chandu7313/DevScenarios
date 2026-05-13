import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Scenario from '@/models/Scenario';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (domain && domain !== 'all') {
      query.domain = domain;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const scenarios = await Scenario.find(query).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(scenarios);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
