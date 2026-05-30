"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { Scenario } from '@/types';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  scenario: Scenario;
}

const DOMAIN_LABELS: Record<string, string> = {
  auth: 'Auth', caching: 'Caching', concurrency: 'Concurrency',
  queues: 'Queues', databases: 'Databases', realtime: 'Realtime',
  resilience: 'Resilience', security: 'Security', infra: 'Infra',
  observability: 'Observability', saas: 'SaaS', ai: 'AI',
};

const DOMAIN_COLORS: Record<string, string> = {
  auth: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900/50',
  caching: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50',
  concurrency: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50',
  queues: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50',
  databases: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
  realtime: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-400 dark:border-cyan-900/50',
  resilience: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50',
  security: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50',
  infra: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-700/50',
  observability: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-900/50',
  saas: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50',
  ai: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-900/50',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  critical: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50',
  hard: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50',
  core: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50',
  advanced: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50',
};

export function ScenarioNavbar({ scenario }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domainLabel = DOMAIN_LABELS[scenario.domain] ?? scenario.domain;
  const domainColor = DOMAIN_COLORS[scenario.domain] ?? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-700/50';
  const difficultyColor = DIFFICULTY_COLORS[scenario.difficulty] ?? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-700/50';

  return (
    <nav
      className="h-14 flex-shrink-0 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-gray-800 px-6 flex items-center justify-between z-30"
      aria-label="Scenario navigation"
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => router.push('/')}
          aria-label="Back to home"
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-slate-200 dark:text-gray-800 flex-shrink-0">|</span>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm min-w-0">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex-shrink-0 transition-colors">
            Home
          </Link>
          <span className="text-slate-400 dark:text-gray-600 flex-shrink-0">/</span>
          <span className="text-slate-500 dark:text-gray-400 flex-shrink-0">{domainLabel}</span>
          <span className="text-slate-400 dark:text-gray-600 flex-shrink-0">/</span>
          <span className="text-slate-900 dark:text-gray-100 font-medium truncate max-w-[200px] lg:max-w-[360px]">
            {scenario.title}
          </span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <span className={`hidden sm:inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full border ${domainColor}`}>
          {domainLabel}
        </span>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${difficultyColor}`}>
          {scenario.difficulty}
        </span>
        <ThemeToggle />
        <button
          onClick={handleShare}
          aria-label="Copy link to clipboard"
          title="Share"
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
}
