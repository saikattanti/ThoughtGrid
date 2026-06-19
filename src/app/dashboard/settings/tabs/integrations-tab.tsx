'use client'

import { createClient } from '@/db/supabase/client'
import { useState } from 'react'

export function IntegrationsTab({ hasLinkedIn }: { hasLinkedIn: boolean }) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-lg border border-outline glass-card">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/30">
            <span className="font-bold text-[#0A66C2] text-[20px] leading-none">in</span>
          </div>
          <div>
            <h4 className="text-[14px] font-medium text-foreground">LinkedIn</h4>
            <p className="text-[12px] text-muted">
              {hasLinkedIn ? 'Connected for direct publishing' : 'Connect to publish posts directly to your feed'}
            </p>
          </div>
        </div>

        <div>
          {hasLinkedIn ? (
            <div className="px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/10 text-primary text-[12px] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Connected
            </div>
          ) : (
            <button
              onClick={handleConnectLinkedIn}
              disabled={isLoading}
              className="px-4 py-2 rounded-sm border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-foreground text-[14px] font-medium hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="flex items-center justify-between p-4 rounded-lg border border-outline glass-card opacity-60">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-foreground flex items-center justify-center">
            <span className="font-bold text-background text-[20px] leading-none">X</span>
          </div>
          <div>
            <h4 className="text-[14px] font-medium text-foreground">X (Twitter)</h4>
            <p className="text-[12px] text-muted">Coming Soon: Cross-post directly to X</p>
          </div>
        </div>
        <button disabled className="px-4 py-2 rounded-sm border border-outline bg-background/50 text-muted text-[14px] font-medium cursor-not-allowed">
          Coming Soon
        </button>
      </div>
      
      <div className="flex items-center justify-between p-4 rounded-lg border border-outline glass-card opacity-60">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-purple-600/10 flex items-center justify-center border border-purple-500/30">
            <span className="material-symbols-outlined text-purple-500 text-[20px]">api</span>
          </div>
          <div>
            <h4 className="text-[14px] font-medium text-foreground">Custom API Keys</h4>
            <p className="text-[12px] text-muted">Bring your own keys for advanced usage</p>
          </div>
        </div>
        <button disabled className="px-4 py-2 rounded-sm border border-outline bg-background/50 text-muted text-[14px] font-medium cursor-not-allowed">
          Coming Soon
        </button>
      </div>
    </div>
  )
}
