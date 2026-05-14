import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function ScenarioNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-indigo-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Scenario Not Found</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
        The scenario you&apos;re looking for doesn&apos;t exist or was removed.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
