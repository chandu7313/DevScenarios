"use client";

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-rose-500', 'bg-cyan-500', 'bg-amber-500',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function extractCompany(raw: string): { company: string; description: string } {
  // realWorldExamples are strings like "Banking session termination" or "Uber's surge pricing"
  const parts = raw.split(/['']s |'s | at | — | - /);
  if (parts.length > 1) {
    return { company: parts[0].trim(), description: raw };
  }
  // If we can't split, use first two words as company
  const words = raw.split(' ');
  const company = words.slice(0, 2).join(' ');
  return { company, description: raw };
}

interface CompanyCardProps {
  company: string;
  description: string;
}

export function CompanyCard({ company, description }: CompanyCardProps) {
  const colorClass = getColorFromName(company);
  const initials = company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="flex flex-col gap-3 flex-1 min-w-[180px] bg-white dark:bg-gray-850 border border-slate-200 dark:border-gray-800 rounded-xl p-4 hover:border-indigo-200 dark:hover:border-indigo-500 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
          aria-hidden="true"
        >
          {initials || company.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 leading-tight">{company}</span>
      </div>
      <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed flex-1">{description}</p>
      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer transition-colors">
        Details →
      </span>
    </div>
  );
}

export { extractCompany };
