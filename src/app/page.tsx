import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-outline-variant)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-outline-variant)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-[10px] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>Personal Branding OS · Powered by AI</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-[48px] md:text-[72px] font-semibold text-foreground tracking-[-0.04em] leading-[1.1]">
            Your Personal Brand,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Powered by AI.
            </span>
          </h1>
          <p className="text-[16px] md:text-[20px] text-muted max-w-2xl mx-auto leading-[1.6]">
            ThoughtGrid is the ultimate operating system for creators and founders.
            Discover trending intelligence, synthesize insights, and generate
            high-converting LinkedIn posts in seconds.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[14px] font-medium text-background transition-all rounded-sm bg-foreground hover:bg-primary hover:shadow-[0_0_20px_rgba(192,193,255,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Get Started Free
          </Link>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[14px] font-medium text-muted transition-all rounded-sm border border-outline hover:border-primary/50 hover:text-foreground"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            Watch Demo
          </a>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          {['Intelligence Radar', 'Content Studio', 'AI Generation', 'LinkedIn Publishing', 'Analytics'].map(f => (
            <span key={f} className="font-mono text-[11px] text-muted border border-outline px-3 py-1.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
