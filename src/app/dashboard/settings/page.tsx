import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsClient } from './client'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return redirect('/login')

  // Check if linkedin_oidc is in the user's identities
  const identities = user.identities || []
  const hasLinkedIn = identities.some(identity => identity.provider === 'linkedin_oidc')

  const email = user.email || ''
  const fullName = user.user_metadata?.full_name || ''
  const avatarUrl = user.user_metadata?.avatar_url || ''

  return (
    <div className="max-w-[1000px] mx-auto space-y-8 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-outline pb-2 relative z-10">
        <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Settings</h2>
      </div>

      <section className="relative z-10">
        <div className="glass-panel p-6 rounded-xl border border-outline">
          <SettingsClient 
            hasLinkedIn={hasLinkedIn} 
            email={email}
            fullName={fullName}
            avatarUrl={avatarUrl}
          />
        </div>
      </section>
    </div>
  )
}
