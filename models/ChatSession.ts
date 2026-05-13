import mongoose, { Schema, Document } from 'mongoose';
import { ChatSession as IChatSession } from '../types';

export interface ChatSessionDocument extends Omit<IChatSession, '_id'>, Document {}

const ChatSessionSchema = new Schema<ChatSessionDocument>({
  sessionId: { type: String, required: true, index: true },
  scenarioSlug: { type: String, required: true, index: true },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

// Ensure a user has only one session per scenario if needed, or allow multiple.
// The requirement says "per session", and sessionId is stored in localStorage.
ChatSessionSchema.index({ sessionId: 1, scenarioSlug: 1 });

export default mongoose.models.ChatSession || mongoose.model<ChatSessionDocument>('ChatSession', ChatSessionSchema);
