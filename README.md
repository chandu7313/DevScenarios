# DevScenarios 🚀

**DevScenarios** is a production-grade web application designed for developers to browse real-world production engineering scenarios and engage with an AI-powered senior staff engineer for deep, structured explanations.

## 🛠 Tech Stack

- **Frontend/Backend**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (gemini-1.5-flash) with streaming
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## ✨ Core Features

### 1. Scenario Browser (Home Page)
- **Grid View**: A beautiful grid of 60+ real-world production engineering scenarios.
- **Filtering**: Instant filtering by domain (Auth, Caching, Databases, Queues, Security, AI, etc.).
- **Fuzzy Search**: Client-side search bar to find scenarios by title, description, or tags.
- **Responsive Cards**: Domain-specific color indicators and difficulty badges (Critical, Hard, Core, Advanced).

### 2. Scenario Deep-Dive
- **Information Panel**: Comprehensive overview of the problem, root cause analysis, and real-world company examples.
- **AI Chat Mentor**: A specialized chat interface where Gemini acts as a Senior Staff Engineer.
- **Streaming Responses**: Real-time token streaming for a natural conversation feel.
- **Persistence**: Chat history is saved to MongoDB per session (anonymous `sessionId` stored in localStorage).

### 3. Engineering Excellence
- **System Prompting**: Advanced prompt engineering ensures the AI provides code-heavy, metric-focused, and scalable solutions.
- **Dark UI**: Premium "Developer-First" aesthetic with glassmorphism and grid patterns.
- **Performance**: Static generation of scenario pages (`generateStaticParams`) for blazing-fast navigation.

## 📂 Project Structure

```text
app/
├── api/
│   ├── chat/route.ts          # Gemini streaming API route
│   ├── scenarios/route.ts     # Scenario fetching & filtering
│   └── sessions/route.ts      # Session & history management
├── scenarios/[slug]/
│   └── page.tsx               # Scenario detail + Chat interface
├── globals.css                # Custom theme & glassmorphism
├── layout.tsx                 # Root layout & grid background
└── page.tsx                   # Home - Scenario Browser
components/
├── ChatPanel.tsx              # Main chat logic & streaming handler
├── DomainFilter.tsx           # Category selection pills
├── MessageBubble.tsx          # Markdown & Code block renderer
├── ScenarioCard.tsx           # Grid item UI
├── ScenarioGrid.tsx           # Logic for filtering & search
├── SearchBar.tsx              # Fuzzy search input
└── StreamingMessage.tsx       # Active AI response indicator
lib/
├── db.ts                      # MongoDB connection (Singleton)
├── gemini.ts                  # AI client & System prompts
└── scenarios-data.ts          # Static seed data (60+ scenarios)
models/
├── ChatSession.ts             # Mongoose Session schema
└── Scenario.ts                # Mongoose Scenario schema
scripts/
└── seed.ts                    # DB population script
types/
└── index.ts                   # Shared TypeScript definitions
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB instance (Atlas or Local)
- Google Gemini API Key

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Seeding
Populate the 60+ production scenarios into your database:
```bash
npm run seed
```

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start exploring.

## 📜 Code Quality Rules
- **TypeScript Strict Mode**: Zero `any` types.
- **Web Streams API**: Native streaming for optimal performance on edge runtimes.
- **Lean Queries**: MongoDB `.lean()` usage for fast read performance.
- **Modular CSS**: No inline styles; 100% Tailwind utility-based.

---
Built with ❤️ for the Engineering Community.
