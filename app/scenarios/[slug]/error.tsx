"use client";

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function ScenarioError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
        An error occurred while loading this scenario. The scenario may not exist or was removed.
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
