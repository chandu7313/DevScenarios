'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  Zap, 
  Database, 
  RefreshCcw, 
  Container, 
  Layers, 
  Activity, 
  Cpu, 
  MessageSquare, 
  Globe, 
  Terminal,
  ArrowRight
} from 'lucide-react';
import { Scenario, Domain, Difficulty } from '../types';

interface MasteryMapProps {
  initialScenarios: Scenario[];
}

const DOMAIN_CONFIG: Record<Domain, { name: string; icon: React.ReactNode; color: string }> = {
  auth: { name: 'Auth & Authorization', icon: <Shield className="w-5 h-5 text-blue-400" />, color: 'border-blue-500' },
  caching: { name: 'Caching & Redis', icon: <Zap className="w-5 h-5 text-yellow-400" />, color: 'border-yellow-500' },
  databases: { name: 'Databases & Indexing', icon: <Database className="w-5 h-5 text-green-400" />, color: 'border-green-500' },
  resilience: { name: 'Resilience Patterns', icon: <RefreshCcw className="w-5 h-5 text-red-400" />, color: 'border-red-500' },
  infra: { name: 'Infrastructure & K8s', icon: <Container className="w-5 h-5 text-cyan-400" />, color: 'border-cyan-500' },
  saas: { name: 'Multi-tenant SaaS', icon: <Layers className="w-5 h-5 text-indigo-400" />, color: 'border-indigo-500' },
  concurrency: { name: 'Concurrency & Race', icon: <Activity className="w-5 h-5 text-orange-400" />, color: 'border-orange-500' },
  queues: { name: 'Queues & Kafka', icon: <Cpu className="w-5 h-5 text-purple-400" />, color: 'border-purple-500' },
  realtime: { name: 'Real-time Systems', icon: <Globe className="w-5 h-5 text-emerald-400" />, color: 'border-emerald-500' },
  security: { name: 'Security Attacks', icon: <Shield className="w-5 h-5 text-rose-400" />, color: 'border-rose-500' },
  observability: { name: 'Observability', icon: <Activity className="w-5 h-5 text-amber-400" />, color: 'border-amber-500' },
  ai: { name: 'AI Systems & RAG', icon: <MessageSquare className="w-5 h-5 text-violet-400" />, color: 'border-violet-500' },
};

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string }> = {
  critical: { label: 'CRITICAL', color: 'bg-red-900/50 text-red-400 border-red-900/50' },
  hard: { label: 'HARD', color: 'bg-orange-900/50 text-orange-400 border-orange-900/50' },
  core: { label: 'CORE', color: 'bg-blue-900/50 text-blue-400 border-blue-900/50' },
  advanced: { label: 'ADVANCED', color: 'bg-purple-900/50 text-purple-400 border-purple-900/50' },
};

export default function MasteryMap({ initialScenarios }: MasteryMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | Domain>('all');
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(DOMAIN_CONFIG).forEach(d => initial[d] = true);
    return initial;
  });

  const filteredData = useMemo(() => {
    let result = initialScenarios;

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.shortDescription.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by domain/difficulty pill
    if (activeFilter === 'critical') {
      result = result.filter(s => s.difficulty === 'critical');
    } else if (activeFilter !== 'all') {
      result = result.filter(s => s.domain === activeFilter);
    }

    // Group by domain
    const groups: Record<Domain, Scenario[]> = {} as any;
    result.forEach(s => {
      if (!groups[s.domain]) groups[s.domain] = [];
      groups[s.domain].push(s);
    });

    return groups;
  }, [initialScenarios, searchQuery, activeFilter]);

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const domainList = Object.keys(DOMAIN_CONFIG) as Domain[];
  const leftColumnDomains = domainList.slice(0, 6);
  const rightColumnDomains = domainList.slice(6);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Production Engineering Mastery Map
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            60+ real-world scenarios, every critical engineering domain. Click any scenario to go deep.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { label: 'Scenarios', value: '72' },
              { label: 'Domains', value: '12' },
              { label: 'Dimensions Per Topic', value: '20' },
              { label: 'Depth', value: '∞' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Search & Filters */}
        <div className="space-y-6 mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search scenarios... e.g. 'race condition', 'Kafka', 'JWT'"
              className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'critical', label: 'Critical' },
              ...domainList.map(d => ({ id: d, label: DOMAIN_CONFIG[d].name }))
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeFilter === pill.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {leftColumnDomains.map(d => (
              <DomainSection 
                key={d} 
                domain={d} 
                scenarios={filteredData[d] || []}
                isExpanded={expandedDomains[d]}
                onToggle={() => toggleDomain(d)}
              />
            ))}
          </div>
          <div className="space-y-8">
            {rightColumnDomains.map(d => (
              <DomainSection 
                key={d} 
                domain={d} 
                scenarios={filteredData[d] || []}
                isExpanded={expandedDomains[d]}
                onToggle={() => toggleDomain(d)}
              />
            ))}
          </div>
        </div>

        {/* Mental Model Section */}
        <section className="mt-24 pt-16 border-t border-gray-900 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The senior engineer's mental model</h2>
            <p className="text-gray-400 leading-relaxed">
              Mid-level engineers ask "How do I build this?". Senior engineers ask "How will this fail under load?". 
              Production engineering is the art of identifying and mitigating failure modes before they happen in 
              the wild. It's about seeing the invisible contracts between systems.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                q: "Where is the system's contract being violated?",
                a: "Every API, database call, and message queue is a contract. Failures occur when assumptions about latency, availability, or throughput are broken by the underlying physical infrastructure."
              },
              {
                q: "What's the failure mode under concurrency?",
                a: "Single-threaded logic works in dev. Production is a hurricane of parallel events. If two events happen at the exact same millisecond, does your data stay consistent?"
              },
              {
                q: "Where does consistency vs availability trade off?",
                a: "You cannot have both in a partitioned network. Choosing which to sacrifice for a specific feature is the core architectural decision of every distributed system."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-blue-400 font-bold text-xl group-hover:border-blue-500/50 transition-colors">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{item.q}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} DevScenarios. Built for Production Engineering Excellence.</p>
        </footer>
      </main>
    </div>
  );
}

function DomainSection({ domain, scenarios, isExpanded, onToggle }: { 
  domain: Domain; 
  scenarios: Scenario[]; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = DOMAIN_CONFIG[domain];
  if (scenarios.length === 0) return null;

  return (
    <div className={`bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-1 ring-gray-700' : ''}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center border-l-2 ${config.color}`}>
            {config.icon}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-200">{config.name}</h3>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{scenarios.length} Scenarios</span>
          </div>
        </div>
        {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-800 divide-y divide-gray-800/50">
          {scenarios.map((s) => (
            <Link key={s.slug} href={`/scenarios/${s.slug}`}>
              <div className="group flex items-center justify-between p-5 hover:bg-gray-800/40 transition-all cursor-pointer">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-300 group-hover:text-blue-400 transition-colors">{s.title}</h4>
                    <DifficultyBadge difficulty={s.difficulty} />
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 group-hover:text-gray-400 transition-colors">
                    {s.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${config.color} tracking-tighter`}>
      {config.label}
    </span>
  );
}
