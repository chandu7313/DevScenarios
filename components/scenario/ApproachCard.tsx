"use client";

import { Approach } from '@/types';

interface ApproachCardProps {
  approach: Approach;
  index: number;
}

const complexityConfig: Record<Approach['complexity'], { label: string; classes: string }> = {
  low:    { label: 'Low Complexity',    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  medium: { label: 'Medium Complexity', classes: 'bg-amber-50 text-amber-700 border border-amber-200' },
  high:   { label: 'High Complexity',   classes: 'bg-red-50 text-red-700 border border-red-200' },
};

export function ApproachCard({ approach, index }: ApproachCardProps) {
  const complexity = complexityConfig[approach.complexity];

  return (
    <div className="group flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-l-4 hover:border-l-indigo-500 hover:shadow-sm transition-all cursor-default">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
          {index + 1}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">{approach.title}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${complexity.classes}`}>
            {complexity.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{approach.description}</p>
      </div>
    </div>
  );
}
