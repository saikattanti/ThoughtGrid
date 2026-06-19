import { Suspense } from 'react'
import { ContentStudioClient } from './client'

export default function ContentStudioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-white tracking-tight shrink-0">Content Studio</h1>
      <div className="flex-1">
        <Suspense fallback={<div className="text-zinc-400">Loading editor...</div>}>
          <ContentStudioClient />
        </Suspense>
      </div>
    </div>
  )
}
