import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface HNStory {
  id: number
  title: string
  url: string
  score: number
  time: number
  by: string
}

async function getTopStories(): Promise<HNStory[]> {
  try {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    const ids: number[] = await res.json()
    const top10Ids = ids.slice(0, 10)
    
    const stories = await Promise.all(
      top10Ids.map(async (id) => {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        return itemRes.json()
      })
    )
    return stories.filter(story => story && story.url) // Only return stories with URLs
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return []
  }
}

export async function NewsFeed() {
  const stories = await getTopStories()

  if (stories.length === 0) {
    return <div className="text-zinc-400">Unable to load trending news at this time.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story) => (
        <Card key={story.id} className="border-white/10 bg-[#1e1f26] text-white flex flex-col hover:border-indigo-500/30 transition-colors">
          <CardHeader className="pb-3 flex-1">
            <CardTitle className="text-lg leading-tight line-clamp-2">
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 flex items-start gap-2">
                {story.title}
                <ExternalLink className="h-4 w-4 shrink-0 mt-1 opacity-50" />
              </a>
            </CardTitle>
            <CardDescription className="text-zinc-400 mt-2">
              {story.score} points by {story.by}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link 
              href={`/dashboard/content?url=${encodeURIComponent(story.url)}&title=${encodeURIComponent(story.title)}`}
              className="inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 h-8 gap-1.5 px-2.5 w-full border border-zinc-700 bg-transparent hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-white"
            >
              Generate Post <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
