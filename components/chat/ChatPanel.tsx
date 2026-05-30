"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { Trash2, Send, Loader2, X, BrainCircuit } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { StreamingMessage } from './StreamingMessage';
import { TypingIndicator } from './TypingIndicator';
import { Scenario, Message } from '@/types';

interface Props {
  scenario: Scenario;
  onClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'Explain the root cause with a real code example',
  'How did Uber or Netflix solve this in production?',
  'Show me Node.js implementation with all edge cases',
];

function formatTime(ts: Date | string): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatPanel({ scenario, onClose }: Props) {
  const { messages, isStreaming, error, inputValue, setInputValue, sendMessage, clearChat } =
    useChat(scenario.slug);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isStreaming) return;
    sendMessage(inputValue);
    setCharCount(0);
  }, [inputValue, isStreaming, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastMsgIdx = messages.length - 1;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              aria-label="Clear conversation"
              title="Clear conversation"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 px-2.5 py-1 rounded-full max-w-full">
            <span>📚</span>
            <span className="truncate font-medium">{scenario.title}</span>
          </span>
        </div>
      </header>

      {/* ── Messages ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        role="log"
        aria-label="Chat messages"
        className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 dark:bg-gray-950 space-y-1 scroll-smooth
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-slate-200
          dark:[&::-webkit-scrollbar-thumb]:bg-gray-800
          [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {messages.length === 0 ? (
          /* ── Empty State ─────────────────────────────────────── */
          <div className="h-full flex flex-col items-center justify-center text-center py-8 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
              <BrainCircuit className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-gray-100">Ask me anything</p>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 max-w-xs">
                Get staff-engineer level explanations with real code and production stories.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mt-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full flex items-center justify-between bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl px-4 py-3 text-left hover:border-indigo-300 dark:hover:border-indigo-950/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all group"
                >
                  <span className="text-sm text-slate-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 leading-snug">{q}</span>
                  <span className="text-indigo-400 ml-3 flex-shrink-0">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg: Message, idx: number) => {
              const isUser = msg.role === 'user';
              const isLast = idx === lastMsgIdx;
              const showStreaming = isStreaming && isLast && !isUser;
              const showTyping = isStreaming && isLast && !isUser && msg.content === '';

              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
                  <span className={`text-[10px] font-medium mb-1 ${isUser ? 'text-slate-400' : 'text-indigo-500'}`}>
                    {isUser ? 'You' : 'AI'}
                  </span>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm border ${
                      isUser
                        ? 'bg-indigo-600 text-white border-indigo-500 rounded-br-none'
                        : 'bg-white dark:bg-gray-850 border-slate-200 dark:border-gray-800 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    ) : showTyping ? (
                      <TypingIndicator />
                    ) : (
                      <StreamingMessage content={msg.content} isStreaming={showStreaming} />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-gray-505 mt-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              );
            })}
            {error && (
              <div className="text-xs text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Input ────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={`Ask anything about ${scenario.title}...`}
            aria-label="Chat input"
            className="flex-1 resize-none bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-gray-100
              placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent
              transition-all min-h-[44px] max-h-[120px]"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            aria-label="Send message"
            className={`p-2.5 rounded-lg flex-shrink-0 transition-all ${
              !inputValue.trim() || isStreaming
                ? 'bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
            }`}
          >
            {isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-slate-400 dark:text-gray-550">Powered by Gemini 1.5 Flash</span>
          {charCount > 200 && (
            <span className={`text-[10px] ${charCount > 500 ? 'text-red-500' : 'text-slate-400 dark:text-gray-550'}`}>
              {charCount} chars
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
