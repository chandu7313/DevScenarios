import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  scenarioTitle: string;
  onSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<Props> = ({ scenarioTitle, onSelect }) => {
  const suggestions = [
    "Explain the root cause with a real code example",
    `How did companies like Uber or Netflix solve ${scenarioTitle}?`,
    "Show me the Node.js production implementation",
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-indigo-600" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Ask anything about this scenario
      </h2>
      <p className="text-sm text-gray-500 max-w-sm mb-10 leading-relaxed">
        Get staff-engineer level explanations, real code, and production battle stories
      </p>

      <div className="w-full max-w-md space-y-3">
        {suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-xl text-left text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all group"
          >
            <span>{q}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};
