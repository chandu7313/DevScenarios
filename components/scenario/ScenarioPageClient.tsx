"use client";

import { useState } from 'react';
import { ScenarioNavbar } from '@/components/layout/ScenarioNavbar';
import { ScenarioContent } from '@/components/scenario/ScenarioContent';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { MessageSquare, X } from 'lucide-react';
import { Scenario } from '@/types';

interface Props {
  scenario: Scenario;
}

export function ScenarioPageClient({ scenario }: Props) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <ScenarioNavbar scenario={scenario} />

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: scenario content (60%) */}
        <div className="w-full lg:w-[60%] h-full border-r border-slate-200 dark:border-gray-800">
          <ScenarioContent scenario={scenario} onChatFocus={() => setChatOpen(true)} />
        </div>

        {/* Right panel: AI chat (40%) – desktop only */}
        <div className="hidden lg:flex lg:w-[40%] h-full flex-col">
          <ChatPanel scenario={scenario} />
        </div>
      </div>

      {/* Mobile floating chat button */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl shadow-indigo-300 dark:shadow-none transition-all"
        onClick={() => setChatOpen(true)}
        aria-label="Open AI chat"
      >
        <MessageSquare className="w-5 h-5" />
        Chat with AI
      </button>

      {/* Mobile bottom sheet */}
      {chatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setChatOpen(false)}
            aria-hidden="true"
          />
          {/* Sheet */}
          <div className="relative bg-white dark:bg-gray-900 rounded-t-2xl h-[85vh] flex flex-col animate-slide-up-sheet">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-slate-300 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatPanel scenario={scenario} onClose={() => setChatOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
