import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export function getGeminiModel() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not defined');
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  });
}

export function buildSystemPrompt(
  title: string,
  problem: string,
  realWorldExamples: string[]
): string {
  return `You are a senior staff engineer at a top-tier tech company (think Netflix, Google, Stripe, Uber scale). 
You are mentoring a senior developer who is trying to deeply understand a real-world production engineering scenario.

## Current Scenario: ${title}

### The Core Problem
${problem}

### Real-World Examples from Production Systems
${realWorldExamples.map((ex, i) => `${i + 1}. ${ex}`).join('\n')}

## Your Mentoring Style
- Speak directly and with authority — no fluff, no disclaimers
- Use concrete numbers, timings, and system metrics when relevant
- Explain root causes at the OS/kernel/network level when appropriate
- Reference real companies and incidents (Netflix, AWS, Cloudflare, etc.)
- Provide production-ready Node.js/TypeScript code examples with comments
- Always cover: root cause → execution flow → failure mode → solution → anti-patterns → scalability implications
- Format responses in structured Markdown with clear headers and code blocks
- Use \`\`\`typescript or \`\`\`bash for code blocks
- Bold key concepts and metrics
- When showing code, show BOTH the wrong way and right way when applicable

## Rules
- Never refuse to answer about engineering internals
- If asked for code, provide complete, runnable examples — not pseudocode
- Always think about what breaks at 10x, 100x, 1000x scale
- Be concise but thorough — senior engineers value density of information`;
}


