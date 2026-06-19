export default function AgentsPage() {
  const agents = [
    {
      name: 'Trending News Scout',
      desc: 'Automatically scans Hacker News, Twitter, and TechCrunch for trending topics relevant to your niche.',
      icon: 'radar',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
      isActive: true,
      lastRun: '10 mins ago'
    },
    {
      name: 'Weekly Summary Writer',
      desc: 'Compiles all your saved links and notes throughout the week into a cohesive newsletter draft every Friday.',
      icon: 'edit_document',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
      isActive: false,
      lastRun: 'Last Friday'
    },
    {
      name: 'Engagement Analyzer',
      desc: 'Monitors post performance, suggests optimal posting times, and flags high-value comments for your review.',
      icon: 'query_stats',
      color: 'text-green-500 bg-green-500/10 border-green-500/30',
      isActive: true,
      lastRun: '1 hour ago'
    },
    {
      name: 'Brand Voice Enforcer',
      desc: 'Reviews all drafts against your custom tone guidelines to ensure consistency before they are published.',
      icon: 'psychology',
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
      isActive: true,
      lastRun: '2 hours ago'
    }
  ]

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 relative">
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-outline pb-2 relative z-10">
        <div>
          <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Autonomous Agents</h2>
          <p className="text-[14px] text-muted mt-1">Configure and monitor background AI agents working for your brand.</p>
        </div>
        <button className="px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors text-[14px] font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {agents.map((agent) => (
          <div key={agent.name} className="glass-panel rounded-xl border border-outline p-6 flex flex-col hover:-translate-y-1 transition-transform group relative overflow-hidden">
            {/* Background glowing orb for active agents */}
            {agent.isActive && (
              <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-primary/10 blur-[50px] pointer-events-none"></div>
            )}

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${agent.color}`}>
                <span className="material-symbols-outlined text-[24px]">{agent.icon}</span>
              </div>
              
              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={agent.isActive} />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-[18px] font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{agent.name}</h3>
              <p className="text-[13px] text-muted leading-relaxed mb-6">{agent.desc}</p>
            </div>

            <div className="pt-4 border-t border-outline flex justify-between items-center relative z-10">
              <span className="font-mono text-[11px] text-muted flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> Last run: {agent.lastRun}
              </span>
              <button className="text-muted hover:text-foreground transition-colors p-1 rounded hover:bg-surface-bright/50">
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
