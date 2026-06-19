import Link from 'next/link'

interface HNStory {
  id: number
  title: string
  url: string
  score: number
  by: string
  time: number
}

async function getTopStories(): Promise<HNStory[]> {
  try {
    const idsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { next: { revalidate: 300 } })
    const ids: number[] = await idsRes.json()
    const top12 = ids.slice(0, 12)
    const stories = await Promise.all(
      top12.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { next: { revalidate: 300 } }).then(r => r.json())
      )
    )
    return stories.filter(s => s && s.url && s.title)
  } catch {
    return []
  }
}

function timeAgo(unix: number): string {
  const secs = Math.floor(Date.now() / 1000) - unix
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

const TAGS = ['LLM Release', 'Hardware', 'Policy', 'Research', 'Security', 'Startup', 'Open Source', 'AI Tools']
const TAG_COLORS = [
  'text-primary border-primary/30',
  'text-muted border-muted/30',
  'text-brand-error border-brand-error/30',
  'text-muted border-muted/30',
  'text-primary border-primary/30',
  'text-muted border-muted/30',
  'text-brand-error border-brand-error/30',
  'text-muted border-muted/30',
]

export async function NewsFeed() {
  const stories = await getTopStories()

  if (stories.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center text-muted">
        <span className="material-symbols-outlined text-[48px] text-outline block mb-2">wifi_off</span>
        Unable to load news feed. Please try again later.
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none"></div>

      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4 snap-x">
        {stories.map((story, i) => (
          <div
            key={story.id}
            className="snap-start min-w-[280px] w-[280px] glass-card rounded-lg p-4 hover-glow transition-all duration-300 cursor-pointer group flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5 rounded-full ${TAG_COLORS[i % TAG_COLORS.length]}`}>
                {TAGS[i % TAGS.length]}
              </span>
              <span className="text-muted font-mono text-[10px]">{timeAgo(story.time)}</span>
            </div>

            <h4 className="text-[16px] font-medium text-foreground leading-tight mb-2 group-hover:text-primary transition-colors flex-1">
              {story.title}
            </h4>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-muted/50">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span className="font-mono text-[10px]">{story.score} pts · {story.by}</span>
              </div>
              <Link
                href={`/dashboard/content?url=${encodeURIComponent(story.url || '')}&title=${encodeURIComponent(story.title)}`}
                className="font-mono text-[10px] text-primary hover:text-primary-container transition-colors flex items-center gap-1"
              >
                Generate <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Below feed — grid of selected news with "Generate" CTA */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.slice(0, 6).map((story, i) => (
          <div key={`grid-${story.id}`} className="glass-card rounded-lg p-4 flex flex-col group hover-glow transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-[14px] font-medium text-foreground leading-tight group-hover:text-primary transition-colors flex-1 pr-2">
                {story.title}
              </h4>
              {story.url && (
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              )}
            </div>
            <p className="font-mono text-[11px] text-muted/70">{story.score} points by {story.by}</p>
            <Link
              href={`/dashboard/content?url=${encodeURIComponent(story.url || '')}&title=${encodeURIComponent(story.title)}`}
              className="mt-4 pt-3 border-t border-outline/50 flex items-center justify-between text-muted hover:text-primary transition-colors"
            >
              <span className="font-mono text-[11px]">Generate Post</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
