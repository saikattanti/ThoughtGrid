import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#12131a] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#464554_1px,transparent_1px),linear-gradient(to_bottom,#464554_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#c0c1ff]/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#c0c1ff]/30 bg-[#c0c1ff]/5 text-[#c0c1ff] font-mono text-[10px] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-pulse"></span>
          <span>Personal Branding OS · Powered by AI</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-[48px] md:text-[72px] font-semibold text-[#e2e1eb] tracking-[-0.04em] leading-[1.1]">
            Your Personal Brand,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] to-[#8083ff]">
              Powered by AI.
            </span>
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#c7c4d7] max-w-2xl mx-auto leading-[1.6]">
            ThoughtGrid is the ultimate operating system for creators and founders.
            Discover trending intelligence, synthesize insights, and generate
            high-converting LinkedIn posts in seconds.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[14px] font-medium text-[#12131a] transition-all rounded-sm bg-[#e2e1eb] hover:bg-[#c0c1ff] hover:shadow-[0_0_20px_rgba(192,193,255,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started Free
          </Link>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[14px] font-medium text-[#c7c4d7] transition-all rounded-sm border border-[#464554] hover:border-[#c0c1ff]/50 hover:text-[#e2e1eb]"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            Watch Demo
          </a>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          {['Intelligence Radar', 'Content Studio', 'AI Generation', 'LinkedIn Publishing', 'Analytics'].map(f => (
            <span key={f} className="font-mono text-[11px] text-[#c7c4d7] border border-[#464554] px-3 py-1.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
