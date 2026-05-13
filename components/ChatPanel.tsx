'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Sparkles, Terminal } from 'lucide-react';
import MessageBubble from './MessageBubble';
import StreamingMessage from './StreamingMessage';
import { ChatMessage } from '@/types';

interface ChatPanelProps {
  scenarioSlug: string;
  scenarioContext: {
    title: string;
    problem: string;
    realWorldExamples: string[];
  };
}

export default function ChatPanel({ scenarioSlug, scenarioContext }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How does this scale to 1M RPS?",
    "Show me a Node.js implementation.",
    "What are the common anti-patterns?",
    "Explain the root cause like I'm 5."
  ];

  useEffect(() => {
    // Session management
    let sId = localStorage.getItem('dev_scenarios_session');
    if (!sId) {
      sId = Math.random().toString(36).substring(7);
      localStorage.setItem('dev_scenarios_session', sId);
    }
    setSessionId(sId);

    // Load history
    async function loadHistory() {
      try {
        const res = await fetch(`/api/sessions?sessionId=${sId}&scenarioSlug=${scenarioSlug}`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error('Failed to load history', err);
      }
    }
    loadHistory();
  }, [scenarioSlug]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading || !sessionId) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          scenarioSlug,
          message: text,
          history: messages.slice(-10), // Send last 10 for context
          scenarioContext
        }),
      });

      if (!response.body) throw new Error('No body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        accumulated += chunk;
        setStreamingText(accumulated);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: accumulated,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setStreamingText('');
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Error: Connection lost. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-8 scroll-smooth"
      >
        {messages.length === 0 && !streamingText && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="p-4 bg-brand-500/10 rounded-2xl">
              <Sparkles className="w-8 h-8 text-brand-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Senior Staff AI Mentor</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Ask about the root cause, execution flow, or production-ready implementations for this scenario.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:bg-white/10 hover:border-brand-500/50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        
        {streamingText && (
          <StreamingMessage content={streamingText} />
        )}
        
        {isLoading && !streamingText && (
          <div className="flex items-center space-x-2 text-brand-500 text-xs animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#0d1117] border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <div className="flex-grow relative">
            <div className="absolute top-3 left-4">
              <Terminal className="w-4 h-4 text-gray-600" />
            </div>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a deep technical question..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-500/50 focus:border-brand-500/50 resize-none transition-all"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 text-white rounded-xl transition-all shadow-lg shadow-brand-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-600 mt-3 uppercase tracking-widest">
          Enter to send // Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
