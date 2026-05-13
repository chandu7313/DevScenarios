import MessageBubble from './MessageBubble';

export default function StreamingMessage({ content }: { content: string }) {
  return (
    <div className="relative">
      <MessageBubble 
        message={{
          role: 'assistant',
          content: content,
          timestamp: new Date()
        }} 
      />
      <div className="absolute bottom-6 left-24 flex space-x-1">
        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce delay-75" />
        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce delay-150" />
      </div>
    </div>
  );
}
