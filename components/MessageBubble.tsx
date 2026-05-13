import { ChatMessage } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Cpu } from 'lucide-react';

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
        <div className={`mt-1 p-2 rounded-lg shrink-0 ${isUser ? 'bg-brand-500/10 text-brand-400' : 'bg-white/5 text-gray-400'}`}>
          {isUser ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser 
              ? 'bg-brand-600/20 text-brand-100 border border-brand-500/20' 
              : 'bg-[#0d1117] text-gray-300 border border-[#30363d] prose prose-invert prose-sm max-w-none'
          }`}>
            {isUser ? (
              message.content
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <div className="relative group">
                        <div className="absolute -top-3 right-4 px-2 py-1 bg-[#30363d] text-[10px] text-gray-400 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {match ? match[1].toUpperCase() : 'CODE'}
                        </div>
                        <pre className="!bg-black !border-white/5 !rounded-lg overflow-x-auto p-4 my-2">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-white/10 px-1 rounded text-brand-400" {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => <h1 className="text-brand-400 font-bold text-lg mb-4 mt-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-brand-400 font-semibold text-md mb-3 mt-6 border-b border-white/5 pb-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-gray-200 font-medium text-sm mb-2 mt-4">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-4 space-y-2 my-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-2 my-4">{children}</ol>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          <span className="text-[10px] text-gray-600 mt-2 font-mono uppercase tracking-widest">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
