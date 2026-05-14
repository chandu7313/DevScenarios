export default function ScenarioLoading() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-14 flex-shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gray-200 rounded-lg" />
          <div className="w-px h-5 bg-gray-200" />
          <div className="w-48 h-4 bg-gray-200 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-6 bg-gray-200 rounded-full" />
          <div className="w-14 h-6 bg-gray-200 rounded-full" />
          <div className="w-7 h-7 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel skeleton */}
        <div className="w-full lg:w-[60%] h-full bg-white border-r border-gray-200 px-8 py-8 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Hero */}
            <div className="space-y-3">
              <div className="h-9 bg-gray-200 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-5 w-14 bg-gray-200 rounded-full" />
                ))}
              </div>
              <div className="h-px bg-gray-100 mt-6" />
            </div>

            {/* Section skeletons */}
            {[1, 2, 3].map((s) => (
              <div key={s} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel skeleton (desktop) */}
        <div className="hidden lg:flex lg:w-[40%] h-full flex-col bg-white">
          {/* Chat header */}
          <div className="h-20 border-b border-gray-200 px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-28" />
              <div className="w-7 h-7 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-5 bg-gray-200 rounded-full w-40" />
          </div>
          {/* Chat messages */}
          <div className="flex-1 bg-gray-50 px-4 py-4 space-y-4">
            <div className="flex justify-end">
              <div className="h-16 bg-indigo-100 rounded-2xl rounded-br-none w-2/3" />
            </div>
            <div className="flex justify-start">
              <div className="h-24 bg-gray-200 rounded-2xl rounded-bl-none w-4/5" />
            </div>
            <div className="flex justify-end">
              <div className="h-12 bg-indigo-100 rounded-2xl rounded-br-none w-1/2" />
            </div>
          </div>
          {/* Input */}
          <div className="h-20 border-t border-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
