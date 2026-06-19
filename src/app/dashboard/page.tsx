import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { NewsFeed } from '@/components/news-feed'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  return (
    <div className="max-w-[1440px] mx-auto space-y-10 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      {/* Command Center */}
      <section className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/content" className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center border border-outline group-hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-[20px]">draw</span>
            </div>
            <div>
              <h3 className="text-[14px] font-medium text-foreground">Generate Post</h3>
              <p className="font-mono text-[12px] text-muted mt-1">AI drafted content</p>
            </div>
          </Link>

          <button className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left">
            <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center border border-outline group-hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-[20px]">summarize</span>
            </div>
            <div>
              <h3 className="text-[14px] font-medium text-foreground">Summarize URL</h3>
              <p className="font-mono text-[12px] text-muted mt-1">Extract key insights</p>
            </div>
          </button>

          <button className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left">
            <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center border border-outline group-hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-[20px]">travel_explore</span>
            </div>
            <div>
              <h3 className="text-[14px] font-medium text-foreground">Research Topic</h3>
              <p className="font-mono text-[12px] text-muted mt-1">Deep dive analysis</p>
            </div>
          </button>
        </div>
      </section>

      {/* Intelligence Radar */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-end justify-between border-b border-outline pb-2">
          <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Intelligence Radar</h2>
          <a className="font-mono text-[12px] text-primary hover:text-primary-container transition-colors flex items-center" href="#">
            View All <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
          </a>
        </div>

        {/* Category Chips */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
          {['All Signals', 'LLMs & Foundation Models', 'Robotics', 'AI Ethics & Policy', 'Agentic Workflows', 'Hardware & Compute'].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full font-mono text-[12px] whitespace-nowrap transition-colors border ${
                i === 0
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-outline text-muted hover:border-outline-variant hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Feed */}
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-lg p-4 h-36 animate-pulse bg-background/30" />
            ))}
          </div>
        }>
          <NewsFeed />
        </Suspense>
      </section>

      {/* Bento Grid: Curated Insights + Content Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Curated Insights */}
        <section className="lg:col-span-2 space-y-4">
          <h3 className="text-[20px] font-medium text-foreground border-b border-outline pb-2">Curated Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                tag: 'Deep Learning', tagColor: 'text-primary border-primary/30',
                title: 'The Shift from Parameter Count to Data Quality in Modern LLMs',
                desc: 'Recent studies indicate that aggressive curation of training datasets yields higher performance gains than simply scaling model parameters.'
              },
              {
                tag: 'Robotics', tagColor: 'text-muted border-muted/30',
                title: 'Integration of Multimodal AI in Next-Gen Industrial Robotics',
                desc: 'By coupling vision-language models with robotic control systems, researchers have achieved unprecedented adaptability in manufacturing environments.'
              }
            ].map((item) => (
              <article key={item.title} className="glass-card rounded-xl overflow-hidden group flex flex-col">
                <div className="h-40 w-full overflow-hidden relative bg-background/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-10 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="material-symbols-outlined text-primary text-[80px]">neurology</span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className={`bg-background/80 backdrop-blur font-mono text-[10px] px-2 py-1 rounded border uppercase tracking-wider ${item.tagColor}`}>{item.tag}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-[16px] font-medium text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-[14px] text-muted line-clamp-3 mb-4">{item.desc}</p>
                  <div className="mt-auto pt-4 border-t border-outline/50 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-primary">
                      <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                      <span className="font-mono text-[10px]">AI Summarized</span>
                    </div>
                    <button className="text-muted hover:text-foreground transition-colors">
                      <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Content Pipeline */}
        <section className="lg:col-span-1 space-y-4 flex flex-col">
          <div className="flex justify-between items-center border-b border-outline pb-2">
            <h3 className="text-[20px] font-medium text-foreground">Content Pipeline</h3>
            <button className="text-muted hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
          </div>
          <div className="glass-card rounded-xl flex-1 p-2 flex flex-col space-y-1">
            {/* Processing item */}
            <div className="p-3 rounded-lg hover:bg-surface-bright/20 transition-colors border border-transparent ai-processing-glow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-medium text-foreground truncate pr-4">Analysis: Q3 Tech Earnings</h4>
                <span className="material-symbols-outlined text-primary text-[14px] animate-spin flex-shrink-0">sync</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-[10px] text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">AI-Processing</span>
                <span className="font-mono text-[10px] text-muted">Just now</span>
              </div>
            </div>

            {/* Draft items */}
            {[
              { title: 'Weekly AI Newsletter Draft', status: 'Draft', time: '2h ago', statusColor: 'text-muted border-outline' },
              { title: 'Interview: Future of Agents', status: 'Tomorrow, 9AM', time: '', statusColor: 'text-muted border-muted/30' },
              { title: 'Review: New Coding Assistant', status: 'Draft', time: 'Yesterday', statusColor: 'text-muted border-outline' },
            ].map((item) => (
              <div key={item.title} className="p-3 rounded-lg hover:bg-surface-bright/20 transition-colors border border-transparent hover:border-outline/30 cursor-pointer">
                <h4 className="text-[14px] text-foreground truncate pr-4 mb-1">{item.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className={`font-mono text-[10px] border px-2 py-0.5 rounded flex items-center gap-1 ${item.statusColor}`}>{item.status}</span>
                  {item.time && <span className="font-mono text-[10px] text-muted">{item.time}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
