'use client'

import { createClient } from '@/db/supabase/client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const supabase = createClient()

  const handleOAuthLogin = async (provider: 'google' | 'linkedin_oidc') => {
    setIsLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      console.error('Error logging in:', error.message)
      setIsLoading(null)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#12131a]">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#464554_1px,transparent_1px),linear-gradient(to_bottom,#464554_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c0c1ff]/8 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Card */}
        <div className="glass-card rounded-xl border border-[#464554] p-8 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#c0c1ff]/20 border border-[#c0c1ff]/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <h1 className="text-[32px] font-semibold tracking-tight text-[#e2e1eb]">ThoughtGrid</h1>
            <p className="font-mono text-[12px] text-[#c7c4d7] uppercase tracking-widest">Login to your Personal Branding OS</p>
          </div>

          <div className="h-px bg-[#464554]"></div>

          {/* Auth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[14px] font-medium text-[#e2e1eb] transition-all rounded-sm border border-[#464554] bg-[#1e1f26] hover:bg-[#383940]/50 hover:border-[#908fa0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'google' ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              )}
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin('linkedin_oidc')}
              disabled={isLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[14px] font-medium text-[#e2e1eb] transition-all rounded-sm border border-[#0A66C2]/40 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'linkedin_oidc' ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              ) : (
                <span className="font-bold text-[#0A66C2] text-[18px] leading-none">in</span>
              )}
              Continue with LinkedIn
            </button>
          </div>

          <p className="text-center font-mono text-[11px] text-[#c7c4d7]/50">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p className="text-center mt-6 font-mono text-[11px] text-[#c7c4d7]/40">
          <Link href="/" className="hover:text-[#c0c1ff] transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
