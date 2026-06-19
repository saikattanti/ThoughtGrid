import { Suspense } from 'react'
import { ContentStudioClient } from './client'
import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'

export default async function ContentStudioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return redirect('/login')

  const identities = user.identities || []
  const hasLinkedIn = identities.some(identity => identity.provider === 'linkedin_oidc')

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-white tracking-tight shrink-0 hidden">Content Studio</h1>
      <div className="flex-1">
        <Suspense fallback={<div className="text-zinc-400">Loading editor...</div>}>
          <ContentStudioClient hasLinkedIn={hasLinkedIn} />
        </Suspense>
      </div>
    </div>
  )
}
