import React, { useEffect, useRef } from 'react';
import { Trash2, Send, Loader2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Scenario } from '@/types';

interface Props {
  scenario: Scenario;
}

export const ChatPanel: React.FC<Props> = ({ scenario }) => {
  const {
    messages,
    isStreaming,
    error,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat,
  } = useChat(scenario.slug);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim() && !isStreaming) {
      sendMessage(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Header */}
      <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-20 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-900">AI Assistant</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-500 truncate max-w-[200px] font-medium">
            {scenario.title}
          </span>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto min-h-full flex flex-col">
          {messages.length === 0 ? (
            <SuggestedQuestions 
              scenarioTitle={scenario.title} 
              onSelect={sendMessage} 
            />
          ) : (
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <MessageBubble 
                  key={msg.id} 
                  message={msg} 
                  isStreaming={isStreaming && idx === messages.length - 1} 
                />
              ))}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                  Error: {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 pb-6 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end space-x-3 bg-[#f9fafb] border border-gray-200 rounded-xl p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all shadow-inner">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about this scenario..."
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none text-gray-800 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isStreaming || !inputValue.trim()}
              className={`p-2.5 rounded-lg flex-shrink-0 transition-all ${
                isStreaming || !inputValue.trim()
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
              }`}
            >
              {isStreaming ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-3 font-medium uppercase tracking-widest">
            Powered by Gemini 1.5 Flash · Responds as a staff engineer
          </p>
        </div>
      </div>
    </div>
  );
};
