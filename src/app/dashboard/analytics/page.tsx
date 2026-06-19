export default function AnalyticsPage() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-6 relative">
      <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-outline pb-2 relative z-10">
        <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Analytics</h2>
        
        <div className="flex items-center gap-2">
          <select className="bg-background/50 border border-outline rounded p-2 text-[14px] text-foreground focus:outline-none focus:border-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <button className="px-4 py-2 rounded bg-surface border border-outline hover:border-primary hover:text-primary transition-colors text-[14px] font-medium text-foreground flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span> Export
          </button>
        </div>
      </div>

      {/* High-level stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[
          { label: 'Total Impressions', value: '124.5K', change: '+12.5%', isPositive: true },
          { label: 'Engagements', value: '4,892', change: '+5.2%', isPositive: true },
          { label: 'Click-Through Rate', value: '3.4%', change: '-0.8%', isPositive: false },
          { label: 'Follower Growth', value: '+342', change: '+18.1%', isPositive: true },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-6 rounded-xl border border-outline hover:-translate-y-1 transition-transform">
            <h4 className="text-[13px] text-muted font-medium mb-2">{stat.label}</h4>
            <div className="flex items-end justify-between">
              <span className="text-[28px] font-bold text-foreground leading-none">{stat.value}</span>
              <span className={`text-[12px] font-mono flex items-center ${stat.isPositive ? 'text-green-500' : 'text-brand-error'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {stat.isPositive ? 'trending_up' : 'trending_down'}
                </span>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-outline min-h-[400px] flex flex-col">
          <h3 className="text-[16px] font-medium text-foreground mb-6">Audience Growth vs Engagement</h3>
          
          <div className="flex-1 relative border-l border-b border-outline/50 flex items-end">
            {/* Y Axis labels */}
            <div className="absolute left-[-40px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-muted font-mono">
              <span>10k</span>
              <span>7.5k</span>
              <span>5k</span>
              <span>2.5k</span>
              <span>0</span>
            </div>

            {/* X Axis labels */}
            <div className="absolute left-0 right-0 bottom-[-24px] flex justify-between text-[10px] text-muted font-mono">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Simulated Chart Bars (CSS purely for visual representation) */}
            <div className="w-full h-full flex items-end justify-between px-4 pb-0 pt-8">
              {[40, 65, 30, 85, 55, 95, 75].map((height, i) => (
                <div key={i} className="w-[10%] bg-primary/20 hover:bg-primary/40 transition-colors border-t-2 border-primary rounded-t-sm relative group cursor-pointer" style={{ height: `${height}%` }}>
                  {/* Tooltip */}
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-background border border-outline px-2 py-1 rounded text-[10px] font-mono text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {height * 100} views
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="lg:col-span-1 glass-card p-6 rounded-xl border border-outline flex flex-col">
          <h3 className="text-[16px] font-medium text-foreground mb-4">Top Performing Posts</h3>
          
          <div className="space-y-4 overflow-y-auto pr-2">
            {[
              { title: 'The future of AI Agents in B2B SaaS', views: '45.2K', eng: '1.2K' },
              { title: 'Why I stopped using Next.js Pages router', views: '32.8K', eng: '840' },
              { title: '5 Open Source models you need to try', views: '28.1K', eng: '620' },
              { title: 'My predictions for React 19', views: '15.4K', eng: '310' },
            ].map((post, i) => (
              <div key={i} className="p-3 rounded-lg border border-outline/50 bg-background/30 hover:bg-surface-bright/20 transition-colors cursor-pointer">
                <h4 className="text-[13px] font-medium text-foreground line-clamp-2 mb-2 leading-snug">{post.title}</h4>
                <div className="flex justify-between items-center text-[11px] font-mono text-muted">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> {post.views}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> {post.eng}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full py-2 rounded text-[13px] font-medium text-primary hover:text-primary-container transition-colors">
            View All Posts →
          </button>
        </div>
      </div>
    </div>
  )
}
