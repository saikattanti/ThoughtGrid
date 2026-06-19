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

  return (
    <div className="max-w-[1000px] mx-auto space-y-8 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[#c0c1ff]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-[#464554] pb-2 relative z-10">
        <h2 className="text-[32px] font-semibold text-[#e2e1eb] tracking-tight leading-tight">Settings</h2>
      </div>

      <section className="relative z-10">
        <div className="glass-card rounded-xl border border-[#464554] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#464554] bg-[#1e1f26]/50">
            <h3 className="text-[16px] font-medium text-[#e2e1eb] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff]">manage_accounts</span>
              Connected Accounts
            </h3>
            <p className="text-[14px] text-[#c7c4d7] mt-1">Connect your social accounts to enable direct publishing.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <SettingsClient hasLinkedIn={hasLinkedIn} />
          </div>
        </div>
      </section>
    </div>
  )
}
