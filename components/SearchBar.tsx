import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all duration-200"
        placeholder="Search scenarios, tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
