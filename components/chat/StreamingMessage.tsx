"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface Props {
  content: string;
  isStreaming: boolean;
}

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-900 border-b border-gray-700">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'typescript'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.8125rem', background: '#1e1e1e' }}
        wrapLongLines={false}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

export function StreamingMessage({ content, isStreaming }: Props) {
  return (
    <div
      className="text-sm text-gray-800 leading-relaxed"
      aria-live="polite"
      aria-atomic="false"
    >
      <ReactMarkdown
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const value = String(children).replace(/\n$/, '');
            return !inline && match ? (
              <CodeBlock language={match[1]} value={value} />
            ) : (
              <code
                className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[0.8em] font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
          h1: ({ children }) => <h1 className="text-base font-bold text-gray-900 mt-4 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-sm font-bold text-gray-900 mt-3 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold text-gray-800 mt-3 mb-1">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700">{children}</ol>,
          li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-300 pl-4 my-2 text-gray-600 italic">{children}</blockquote>
          ),
          hr: () => <hr className="my-4 border-gray-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span
          className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-0.5 align-middle animate-[cursor_1s_step-end_infinite]"
          aria-hidden="true"
        >
          ▋
        </span>
      )}
    </div>
  );
}
