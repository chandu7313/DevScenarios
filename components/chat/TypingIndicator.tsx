"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3" aria-label="AI is typing" role="status">
      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-dot [animation-delay:0s]" />
      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-dot [animation-delay:0.2s]" />
      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-dot [animation-delay:0.4s]" />
    </div>
  );
}
