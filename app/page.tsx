import React from 'react';
import MasteryMap from '../components/MasteryMap';
import ScenarioModel from '../models/Scenario';
import connectDB from '../lib/db';

export const dynamic = 'force-dynamic';

async function getScenarios() {
  await connectDB();
  const scenarios = await ScenarioModel.find({}).lean();
  return JSON.parse(JSON.stringify(scenarios));
}

export default async function Page() {
  const scenarios = await getScenarios();
  
  return (
    <MasteryMap initialScenarios={scenarios} />
  );
}
