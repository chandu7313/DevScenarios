import React from 'react';
import { Message } from '@/types';
import { StreamingMessage } from './StreamingMessage';

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export const MessageBubble: React.FC<Props> = ({ message, isStreaming = false }) => {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row' : 'flex-row'}`}>
        {!isUser && (
          <div className="mr-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg ring-2 ring-indigo-500/20">
              DS
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <div
            className={`px-5 py-4 rounded-2xl shadow-sm border ${
              isUser
                ? 'bg-indigo-600 border-indigo-500 text-white rounded-br-sm'
                : 'bg-white border-gray-200 text-gray-800 rounded-bl-sm'
            }`}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            ) : (
              <StreamingMessage content={message.content} isStreaming={isStreaming} />
            )}
          </div>
          <span className={`text-[10px] mt-1.5 text-gray-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </span>
        </div>

        {isUser && (
          <div className="ml-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-300">
              U
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
