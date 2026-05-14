"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { Scenario } from '@/types';

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
  auth: 'bg-violet-50 text-violet-700 border-violet-200',
  caching: 'bg-orange-50 text-orange-700 border-orange-200',
  concurrency: 'bg-blue-50 text-blue-700 border-blue-200',
  queues: 'bg-amber-50 text-amber-700 border-amber-200',
  databases: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  realtime: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  resilience: 'bg-rose-50 text-rose-700 border-rose-200',
  security: 'bg-red-50 text-red-700 border-red-200',
  infra: 'bg-gray-50 text-gray-700 border-gray-200',
  observability: 'bg-teal-50 text-teal-700 border-teal-200',
  saas: 'bg-purple-50 text-purple-700 border-purple-200',
  ai: 'bg-pink-50 text-pink-700 border-pink-200',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  hard: 'bg-orange-50 text-orange-700 border-orange-200',
  core: 'bg-blue-50 text-blue-700 border-blue-200',
  advanced: 'bg-purple-50 text-purple-700 border-purple-200',
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
  const domainColor = DOMAIN_COLORS[scenario.domain] ?? 'bg-gray-50 text-gray-700 border-gray-200';
  const difficultyColor = DIFFICULTY_COLORS[scenario.difficulty] ?? 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <nav
      className="h-14 flex-shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-30"
      aria-label="Scenario navigation"
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => router.push('/')}
          aria-label="Back to home"
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-gray-300 flex-shrink-0">|</span>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm min-w-0">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium flex-shrink-0 transition-colors">
            Home
          </Link>
          <span className="text-gray-400 flex-shrink-0">/</span>
          <span className="text-gray-500 flex-shrink-0">{domainLabel}</span>
          <span className="text-gray-400 flex-shrink-0">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px] lg:max-w-[360px]">
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
        <button
          onClick={handleShare}
          aria-label="Copy link to clipboard"
          title="Share"
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
}
