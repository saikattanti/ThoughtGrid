'use client'

import { createClient } from '@/db/supabase/client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const supabase = createClient()

  const handleOAuthLogin = async (provider: 'google' | 'linkedin_oidc') => {
    setIsLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.error('Error logging in:', error.message)
      setIsLoading(null)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 glass-card rounded-2xl border border-white/10 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">ThoughtGrid</h1>
          <p className="text-sm text-zinc-400">Login to your Personal Branding OS</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white transition-all rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading === 'google' ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
            ) : (
              'Continue with Google'
            )}
          </button>
          
          <button
            onClick={() => handleOAuthLogin('linkedin_oidc')}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white transition-all rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading === 'linkedin_oidc' ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
            ) : (
              'Continue with LinkedIn'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
