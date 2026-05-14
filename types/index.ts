export type Domain =
  | 'auth'
  | 'caching'
  | 'concurrency'
  | 'queues'
  | 'databases'
  | 'realtime'
  | 'resilience'
  | 'security'
  | 'infra'
  | 'observability'
  | 'saas'
  | 'ai';

export type Difficulty = 'critical' | 'hard' | 'core' | 'advanced';

export interface Approach {
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
}

export interface ScenarioOverview {
  problem: string;
  whyItHappens: string;
  realWorldExamples: string[];
  approaches?: Approach[];
}

export interface Scenario {
  _id?: string;
  slug: string;
  title: string;
  domain: Domain;
  difficulty: Difficulty;
  shortDescription: string;
  overview: ScenarioOverview;
  tags: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date | string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date | string;
}

export interface ChatSession {
  _id?: string;
  sessionId: string;
  scenarioSlug: string;
  messages: ChatMessage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ChatRequest {
  sessionId: string;
  scenarioSlug: string;
  message: string;
  history: ChatMessage[];
  scenarioContext: {
    title: string;
    problem: string;
    realWorldExamples: string[];
  };
}

export interface ApiError {
  error: string;
  status?: number;
}
