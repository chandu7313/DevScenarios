import Link from 'next/link';
import { Scenario, Domain } from '@/types';
import { ChevronRight, Cpu, Database, Shield, Zap, Layers, RefreshCcw, Activity, Server, Cloud, Code, MessageSquare } from 'lucide-react';

const domainIcons: Record<Domain, any> = {
  auth: Shield,
  caching: Zap,
  concurrency: RefreshCcw,
  queues: Layers,
  databases: Database,
  realtime: Activity,
  resilience: Server,
  security: Shield,
  infra: Cloud,
  observability: Cpu,
  saas: Code,
  ai: MessageSquare,
};

const domainColors: Record<Domain, string> = {
  auth: 'border-l-blue-500',
  caching: 'border-l-yellow-500',
  concurrency: 'border-l-cyan-500',
  queues: 'border-l-indigo-500',
  databases: 'border-l-emerald-500',
  realtime: 'border-l-orange-500',
  resilience: 'border-l-rose-500',
  security: 'border-l-red-500',
  infra: 'border-l-purple-500',
  observability: 'border-l-green-500',
  saas: 'border-l-pink-500',
  ai: 'border-l-violet-500',
};

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const Icon = domainIcons[scenario.domain] || Code;
  const borderColor = domainColors[scenario.domain] || 'border-l-gray-500';

  return (
    <Link 
      href={`/scenarios/${scenario.slug}`}
      className={`group glass-card p-6 flex flex-col h-full border-l-4 ${borderColor} animate-fade-in hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-brand-500/10 transition-colors">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-brand-400" />
        </div>
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider badge-${scenario.difficulty}`}>
          {scenario.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-400 transition-colors">
        {scenario.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
        {scenario.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {scenario.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center text-xs font-medium text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Scenario <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  );
}
