import ScenarioGrid from '@/components/ScenarioGrid';
import { Terminal, BrainCircuit, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[128px] rounded-full -z-10" />
        
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-8">
          <BrainCircuit className="w-4 h-4 text-brand-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Production-Grade Engineering</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Dev<span className="text-brand-500">Scenarios</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
          Interactive guide to real-world production engineering. 
          Browse scenarios, explore failure modes, and chat with a senior staff AI mentor.
        </p>

        <div className="flex items-center justify-center space-x-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <div className="flex items-center"><Terminal className="w-4 h-4 mr-2" /> Real Cases</div>
          <div className="flex items-center"><BrainCircuit className="w-4 h-4 mr-2" /> Gemini Pro</div>
          <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Zero Fluff</div>
        </div>
      </div>

      {/* Scenario Explorer */}
      <div id="explorer" className="border-t border-white/5 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Scenario Explorer</span>
            <div className="h-px flex-grow bg-gradient-to-r from-white/10 via-white/10 to-transparent" />
          </div>
        </div>
        <ScenarioGrid />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm font-mono">
            DEVSCENARIOS_V1.0.0 // {new Date().getFullYear()}
          </div>
          <div className="flex space-x-6 text-gray-500 text-xs font-medium">
            <a href="#" className="hover:text-brand-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-brand-400 transition-colors">System Status</a>
            <a href="#" className="hover:text-brand-400 transition-colors">API Reference</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
