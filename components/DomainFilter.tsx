import { Domain } from '@/types';

const domains: { id: Domain | 'all', label: string }[] = [
  { id: 'all', label: 'All Domains' },
  { id: 'auth', label: 'Auth' },
  { id: 'caching', label: 'Caching' },
  { id: 'concurrency', label: 'Concurrency' },
  { id: 'queues', label: 'Queues' },
  { id: 'databases', label: 'Databases' },
  { id: 'realtime', label: 'Real-time' },
  { id: 'resilience', label: 'Resilience' },
  { id: 'security', label: 'Security' },
  { id: 'infra', label: 'Infra' },
  { id: 'observability', label: 'Observability' },
  { id: 'saas', label: 'SaaS' },
  { id: 'ai', label: 'AI' },
];

export default function DomainFilter({ active, onSelect }: { active: Domain | 'all', onSelect: (d: Domain | 'all') => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {domains.map((domain) => (
        <button
          key={domain.id}
          onClick={() => onSelect(domain.id)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            active === domain.id
              ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20'
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {domain.label}
        </button>
      ))}
    </div>
  );
}
