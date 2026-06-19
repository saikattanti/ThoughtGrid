import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/5 text-indigo-400 font-mono text-[10px] uppercase tracking-widest mb-4">
          <Sparkles className="h-3 w-3" />
          <span>The Next Generation OS</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Your Personal Brand, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Powered by AI.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          ThoughtGrid is the ultimate operating system for creators and founders. Discover trending news, synthesize insights, and generate high-converting LinkedIn posts in seconds.
        </p>

        <div className="pt-8">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white transition-all rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
