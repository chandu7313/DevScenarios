import connectDB from '@/lib/db';
import Scenario from '@/models/Scenario';
import { notFound } from 'next/navigation';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { ChevronLeft, Info, AlertTriangle, Building2, Terminal } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { Scenario as IScenario } from '@/types';

async function getScenario(slug: string) {
  await connectDB();
  const scenario = await Scenario.findOne({ slug }).lean() as IScenario | null;
  return scenario;
}

export default async function ScenarioPage({ params }: { params: { slug: string } }) {
  const scenario = await getScenario(params.slug);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <Link href="/" className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Scenarios
        </Link>
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Connected // AI Mentor Active</span>
        </div>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Scenario Detail */}
        <div className="w-full lg:w-1/2 border-r border-white/10 overflow-y-auto bg-[#0a0a0c] p-8 lg:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider badge-${scenario.difficulty}`}>
                {scenario.difficulty}
              </span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">{scenario.domain}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {scenario.title}
            </h1>

            <div className="space-y-12">
              <section>
                <div className="flex items-center text-brand-400 mb-4">
                  <Info className="w-5 h-5 mr-2" />
                  <h2 className="text-lg font-semibold">The Problem</h2>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {scenario.overview.problem}
                </p>
              </section>

              <section>
                <div className="flex items-center text-orange-400 mb-4">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <h2 className="text-lg font-semibold">Root Cause Analysis</h2>
                </div>
                <p className="text-gray-400 leading-relaxed italic border-l-2 border-white/5 pl-6">
                  {scenario.overview.whyItHappens}
                </p>
              </section>

              <section>
                <div className="flex items-center text-purple-400 mb-4">
                  <Building2 className="w-5 h-5 mr-2" />
                  <h2 className="text-lg font-semibold">Real-World Context</h2>
                </div>
                <ul className="space-y-4">
                  {scenario.overview.realWorldExamples.map((ex: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 mr-4 shrink-0" />
                      <span className="text-gray-400">{ex}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-2">
              {scenario.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                  ${tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: AI Chat */}
        <div className="w-full lg:w-1/2 flex flex-col bg-black overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent z-10" />
          <ChatPanel scenario={scenario as any} />
        </div>
      </div>
    </div>
  );
}
