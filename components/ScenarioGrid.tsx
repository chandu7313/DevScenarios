'use client';

import { useState, useEffect } from 'react';
import ScenarioCard from './ScenarioCard';
import DomainFilter from './DomainFilter';
import SearchBar from './SearchBar';
import { Scenario, Domain } from '@/types';
import { Loader2 } from 'lucide-react';

export default function ScenarioGrid() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Domain | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchScenarios() {
      setLoading(true);
      try {
        const res = await fetch(`/api/scenarios?domain=${filter}&search=${search}`);
        const data = await res.json();
        setScenarios(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchScenarios, 300);
    return () => clearTimeout(timer);
  }, [filter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <DomainFilter active={filter} onSelect={setFilter} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-brand-500" />
          <p className="font-medium animate-pulse">Loading scenarios...</p>
        </div>
      ) : scenarios.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <ScenarioCard key={s.slug} scenario={s} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 glass-card rounded-2xl">
          <p className="text-gray-400 text-lg">No scenarios found matching your criteria.</p>
          <button 
            onClick={() => { setFilter('all'); setSearch(''); }}
            className="mt-4 text-brand-400 hover:underline text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
