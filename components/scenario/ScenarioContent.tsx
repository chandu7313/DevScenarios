"use client";

import { Scenario } from '@/types';
import { SectionHeader } from './SectionHeader';
import { CompanyCard } from './CompanyCard';
import { ApproachCard } from './ApproachCard';
import { AlertTriangle } from 'lucide-react';

interface Props {
  scenario: Scenario;
  onChatFocus?: () => void;
}

export function ScenarioContent({ scenario, onChatFocus }: Props) {
  const { overview, tags } = scenario;

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 px-8 py-8 scroll-smooth
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-slate-200
      dark:[&::-webkit-scrollbar-thumb]:bg-gray-800
      [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      <div className="max-w-2xl mx-auto space-y-10">

        {/* ── Section 1: Hero ─────────────────────────────────────── */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 leading-tight">{scenario.title}</h1>
          <p className="text-base text-slate-500 dark:text-gray-400 mt-2 leading-relaxed">{scenario.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 text-[11px] font-medium px-2 py-0.5 rounded-full border border-slate-200 dark:border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
          <hr className="mt-6 border-slate-100 dark:border-gray-800/50" />
        </div>

        {/* ── Section 2: The Problem ───────────────────────────────── */}
        <div>
          <SectionHeader icon="🔴" title="The Problem" />
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-red-900 dark:text-red-300 mb-1">The Problem</p>
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{overview.problem}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Why It Happens ────────────────────────────── */}
        <div>
          <SectionHeader icon="⚙️" title="Why It Happens" />
          <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed mb-4">{overview.whyItHappens}</p>

          {/* ASCII Execution Flow */}
          <div className="bg-gray-950 rounded-lg p-5 overflow-x-auto">
            <pre className="text-xs font-mono leading-loose">
              <span className="text-gray-400">{'Thread A  ──── '}</span>
              <span className="text-green-400">{'READ (status=PENDING)'}</span>
              <span className="text-gray-400">{' ──── '}</span>
              <span className="text-yellow-400">{'PROCESS'}</span>
              <span className="text-gray-400">{' ──── '}</span>
              <span className="text-red-400">{'WRITE'}</span>
              <span className="text-gray-505">{' ────►\n'}</span>
              <span className="text-gray-600">{'                      ↕ race window\n'}</span>
              <span className="text-gray-400">{'Thread B       ──── '}</span>
              <span className="text-green-400">{'READ (status=PENDING)'}</span>
              <span className="text-gray-400">{' ──── '}</span>
              <span className="text-yellow-400">{'PROCESS'}</span>
              <span className="text-gray-400">{' ──── '}</span>
              <span className="text-red-400">{'WRITE'}</span>
              <span className="text-gray-505">{' ►'}</span>
            </pre>
          </div>
        </div>

        {/* ── Section 4: Real World Examples ──────────────────────── */}
        {overview.realWorldExamples.length > 0 && (
          <div>
            <SectionHeader icon="🏢" title="Real World Examples" />
            <div className="flex flex-wrap gap-3">
              {overview.realWorldExamples.map((example, i) => {
                const words = example.split(' ');
                const company = words.slice(0, 3).join(' ');
                return (
                  <CompanyCard
                    key={i}
                    company={company}
                    description={example}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ── Section 5: Approaches ────────────────────────────────── */}
        {overview.approaches && overview.approaches.length > 0 && (
          <div>
            <SectionHeader icon="🛠️" title="Approaches to Solve" />
            <div className="space-y-3">
              {overview.approaches.map((approach, i) => (
                <ApproachCard key={i} approach={approach} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Section 6: Key Concepts ──────────────────────────────── */}
        <div>
          <SectionHeader icon="💡" title="Key Concepts" />
          <div className="grid grid-cols-2 gap-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900/30 rounded-lg p-3"
              >
                <p className="text-xs font-bold text-indigo-800 dark:text-indigo-400 capitalize">{tag}</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-500 mt-0.5 leading-snug">
                  Core concept in {scenario.domain} engineering
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 7: CTA (mobile only) ────────────────────────── */}
        <div className="lg:hidden">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-xl p-6 text-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">💬 Ask the AI Assistant</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
              Get a staff-engineer explanation with real code examples, production battle stories, and implementation details.
            </p>
            <button
              onClick={onChatFocus}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Start Chatting →
            </button>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </div>
  );
}
