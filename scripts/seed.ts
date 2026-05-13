import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { SCENARIOS } from '../lib/scenarios-data';
import Scenario from '../models/Scenario';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected.');

    console.log('Cleaning existing scenarios...');
    await Scenario.deleteMany({});
    console.log('Cleaned.');

    console.log(`Seeding ${SCENARIOS.length} scenarios...`);
    await Scenario.insertMany(SCENARIOS);
    console.log('Seeding complete.');

    await mongoose.connection.close();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
