import mongoose, { Schema, Document } from 'mongoose';
import { Scenario as IScenario } from '../types';

export interface ScenarioDocument extends Omit<IScenario, '_id'>, Document {}

const ScenarioSchema = new Schema<ScenarioDocument>({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  domain: { 
    type: String, 
    required: true,
    enum: ['auth', 'caching', 'concurrency', 'queues', 'databases', 'realtime', 'resilience', 'security', 'infra', 'observability', 'saas', 'ai']
  },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['critical', 'hard', 'core', 'advanced']
  },
  shortDescription: { type: String, required: true },
  overview: {
    problem: { type: String, required: true },
    whyItHappens: { type: String, required: true },
    realWorldExamples: [{ type: String }],
  },
  tags: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.models.Scenario || mongoose.model<ScenarioDocument>('Scenario', ScenarioSchema);
