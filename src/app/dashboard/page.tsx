import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { NewsFeed } from '@/components/news-feed'
import { PenTool, FileText, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="relative min-h-full bg-background flex flex-col">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-[1440px] mx-auto w-full space-y-10">
        
        {/* Quick Actions / Command Center */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/dashboard/content" className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#1e1f26] flex items-center justify-center border border-white/10 group-hover:border-indigo-400/50 transition-colors">
                <PenTool className="text-indigo-400 h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Generate Post</h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">AI drafted content</p>
              </div>
            </Link>
            
            <button className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#1e1f26] flex items-center justify-center border border-white/10 group-hover:border-indigo-400/50 transition-colors">
                <FileText className="text-indigo-400 h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Summarize URL</h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">Extract key insights</p>
              </div>
            </button>
            
            <button className="glass-card p-4 rounded-lg flex items-center space-x-4 hover-glow transition-all duration-300 group text-left border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#1e1f26] flex items-center justify-center border border-white/10 group-hover:border-indigo-400/50 transition-colors">
                <Search className="text-indigo-400 h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Research Topic</h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">Deep dive analysis</p>
              </div>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Intelligence Radar (News Feed) */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-end border-b border-white/10 pb-2">
              <h2 className="text-2xl font-semibold text-white tracking-tight">Intelligence Radar</h2>
            </div>
            
            <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
              <button className="px-4 py-1.5 rounded-full border border-indigo-400 text-indigo-400 bg-indigo-400/10 text-xs font-mono whitespace-nowrap transition-colors">Top Tech News</button>
              <button className="px-4 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white text-xs font-mono whitespace-nowrap transition-colors">LLMs & Models</button>
              <button className="px-4 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white text-xs font-mono whitespace-nowrap transition-colors">Startups</button>
            </div>

            <Suspense fallback={<div className="text-zinc-400">Loading trending news...</div>}>
              <NewsFeed />
            </Suspense>
          </section>

          {/* Content Pipeline (Drafts) */}
          <section className="lg:col-span-1 space-y-4 flex flex-col">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="text-xl font-medium text-white">Content Pipeline</h3>
              <button className="text-zinc-400 hover:text-indigo-400 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
            </div>
            <div className="glass-card rounded-xl flex-1 p-2 flex flex-col space-y-1 bg-white/5 border border-white/10">
              
              <div className="p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent ai-processing-glow cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-white truncate pr-4 text-sm">Analysis: OpenAI o1 Release</h4>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <span className="material-symbols-outlined text-indigo-400 text-[14px] animate-spin">⟳</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-mono text-indigo-400 border border-indigo-400/20 bg-indigo-400/5 px-2 py-0.5 rounded">AI-Processing</span>
                  <span className="text-[10px] font-mono text-zinc-400">Just now</span>
                </div>
              </div>

              <div className="p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-white truncate pr-4 text-sm">Weekly AI Newsletter Draft</h4>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-mono text-zinc-400 border border-white/20 px-2 py-0.5 rounded">Draft</span>
                  <span className="text-[10px] font-mono text-zinc-400">2h ago</span>
                </div>
              </div>

            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
