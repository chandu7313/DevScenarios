"use client";

interface SectionHeaderProps {
  icon: string;
  title: string;
  color?: string;
}

export function SectionHeader({ icon, title, color = 'text-gray-400' }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-lg leading-none" role="img" aria-hidden="true">{icon}</span>
      <span className={`text-xs font-semibold uppercase tracking-widest text-gray-500`}>
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
