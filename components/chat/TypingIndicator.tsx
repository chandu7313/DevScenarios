"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3" aria-label="AI is typing" role="status">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
