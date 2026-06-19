'use client'

import { createClient } from '@/db/supabase/client'
import { useState } from 'react'

export function SettingsClient({ hasLinkedIn }: { hasLinkedIn: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleConnectLinkedIn = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.linkIdentity({
      provider: 'linkedin_oidc',
      options: { redirectTo: `${window.location.origin}/dashboard/settings` },
    })
    
    if (error) {
      console.error('Error connecting LinkedIn:', error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-[#464554] bg-[#1a1b22]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-sm bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/30">
          <span className="font-bold text-[#0A66C2] text-[20px] leading-none">in</span>
        </div>
        <div>
          <h4 className="text-[14px] font-medium text-[#e2e1eb]">LinkedIn</h4>
          <p className="text-[12px] text-[#c7c4d7]">
            {hasLinkedIn ? 'Connected for direct publishing' : 'Connect to publish posts directly to your feed'}
          </p>
        </div>
      </div>

      <div>
        {hasLinkedIn ? (
          <div className="px-3 py-1.5 rounded-sm border border-[#c0c1ff]/30 bg-[#c0c1ff]/10 text-[#c0c1ff] text-[12px] font-medium flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Connected
          </div>
        ) : (
          <button
            onClick={handleConnectLinkedIn}
            disabled={isLoading}
            className="px-4 py-2 rounded-sm border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#e2e1eb] text-[14px] font-medium hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">link</span>
            )}
            Connect Account
          </button>
        )}
      </div>
    </div>
  )
}
