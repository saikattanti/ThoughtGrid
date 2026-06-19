export default function PublishPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const dates = Array.from({ length: 14 }, (_, i) => i + 10) // Mock dates starting from 10th

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 relative">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-outline pb-2 relative z-10">
        <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Publishing Center</h2>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded border border-outline bg-surface-dim/30 hover:bg-surface text-[12px] font-medium transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            Previous Week
          </button>
          <button className="px-3 py-1.5 rounded border border-outline bg-surface-dim/30 hover:bg-surface text-[12px] font-medium transition-colors flex items-center gap-1">
            Next Week
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Left column: Queue */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[16px] font-medium text-foreground">Content Queue</h3>
          
          <div className="glass-panel p-4 rounded-xl border border-outline space-y-3">
            {[
              { title: 'Why Agentic AI is the future of work', status: 'Draft', type: 'LinkedIn' },
              { title: 'Top 5 Open Source Models in 2026', status: 'Reviewing', type: 'Twitter' },
              { title: 'The hidden cost of large contexts', status: 'Generating', type: 'LinkedIn' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-outline/50 bg-background/30 hover:bg-background/50 cursor-pointer transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    item.status === 'Draft' ? 'border-outline text-muted' : 
                    item.status === 'Reviewing' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' :
                    'border-primary/30 text-primary bg-primary/10'
                  }`}>{item.status}</span>
                  <span className="text-[10px] text-muted">{item.type}</span>
                </div>
                <h4 className="text-[13px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 rounded border border-dashed border-primary/50 text-primary hover:bg-primary/5 transition-colors text-[13px] font-medium flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span> Create New Post
          </button>
        </div>

        {/* Calendar View */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-xl border border-outline overflow-hidden">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 border-b border-outline bg-surface-dim/30">
              {days.map(day => (
                <div key={day} className="px-4 py-3 text-center text-[12px] font-mono uppercase text-muted tracking-wider border-r border-outline/50 last:border-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-2 h-[600px]">
              {dates.map((date, i) => {
                const isToday = date === 14 // Mock today
                const hasPost = date === 12 || date === 16 || date === 20 // Mock posts
                
                return (
                  <div key={i} className={`p-2 border-r border-b border-outline/50 relative group ${isToday ? 'bg-primary/5' : ''}`}>
                    <div className="flex justify-between items-start">
                      <span className={`text-[12px] font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-on-primary' : 'text-muted group-hover:text-foreground'}`}>
                        {date}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-muted hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>

                    {/* Posts for the day */}
                    {hasPost && (
                      <div className="mt-2 space-y-1">
                        <div className="p-1.5 rounded bg-surface border border-outline text-[11px] leading-tight text-foreground truncate cursor-pointer hover:border-primary/50">
                          {date === 12 ? 'My thoughts on Gemini Flash...' : date === 16 ? '5 tips for prompt eng...' : 'Weekly wrap up'}
                        </div>
                        {date === 16 && (
                          <div className="p-1.5 rounded bg-surface border border-outline text-[11px] leading-tight text-foreground truncate cursor-pointer hover:border-primary/50">
                            Poll: Best IDE in 2026?
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
