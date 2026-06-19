import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsClient } from './client'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return redirect('/login')

  const identities = user.identities || []
  const hasLinkedIn = identities.some(identity => identity.provider === 'linkedin_oidc')

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      {/* Page Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-[32px] font-bold text-foreground mb-2">Settings</h1>
        <p className="text-[16px] text-muted">Manage your account configurations, AI models, and integrations.</p>
      </div>

      {/* Settings Grid Layout */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
        
        {/* Settings Navigation (In-page) */}
        <div className="w-full md:w-56 shrink-0 space-y-1 sticky top-20 h-fit">
          <a href="#api-keys" className="block px-4 py-2 rounded text-primary font-medium bg-primary/10 border-l-2 border-primary transition-all text-[14px]">API & Models</a>
          <a href="#integrations" className="block px-4 py-2 rounded text-muted hover:text-foreground hover:bg-surface-bright/10 border-l-2 border-transparent transition-all text-[14px]">Integrations</a>
          <a href="#preferences" className="block px-4 py-2 rounded text-muted hover:text-foreground hover:bg-surface-bright/10 border-l-2 border-transparent transition-all text-[14px]">Preferences</a>
          <a href="#billing" className="block px-4 py-2 rounded text-muted hover:text-foreground hover:bg-surface-bright/10 border-l-2 border-transparent transition-all text-[14px]">Billing</a>
        </div>

        {/* Settings Sections */}
        <div className="flex-1 space-y-12 min-w-0">
          
          {/* Section: API & Models */}
          <section id="api-keys" className="space-y-6 scroll-mt-24">
            <div className="border-b border-outline/30 pb-2">
              <h3 className="text-[20px] font-medium text-foreground">API & Models</h3>
              <p className="text-[14px] text-muted mt-1">Configure your primary AI engine and manage access keys.</p>
            </div>

            {/* AI Model Selection */}
            <div className="glass-card rounded-xl p-6 border border-outline">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-[14px] font-medium text-foreground flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
                    Primary Engine
                  </h4>
                  <p className="text-[14px] text-muted mt-1">Select the default model for content generation tasks.</p>
                </div>
              </div>
              <div className="relative">
                <select className="w-full bg-background/50 border border-outline/50 rounded-lg py-3 pl-4 pr-10 appearance-none text-[14px] text-foreground focus:outline-none focus:border-primary">
                  <option value="gpt4o">GPT-4o (Optimized)</option>
                  <option value="gemini">Gemini 1.5 Pro</option>
                  <option value="grok">Grok-1</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-muted">
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[12px] font-mono text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                GPT-4o is currently active and processing requests.
              </div>
            </div>

            {/* API Keys */}
            <div className="glass-card rounded-xl p-6 border border-outline">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-[14px] font-medium text-foreground flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">key</span>
                    API Keys
                  </h4>
                </div>
                <button className="px-3 py-1.5 text-[14px] bg-surface hover:bg-surface-bright text-foreground rounded border border-outline/30 transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">add</span> Create Key
                </button>
              </div>

              <div className="space-y-3">
                {/* Key Item */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-outline/20 bg-background/30">
                  <div>
                    <div className="text-[14px] text-foreground">Production Key</div>
                    <div className="font-mono text-muted text-[12px] mt-1">bf_live_••••••••••••8x9q</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/30 text-primary bg-primary/10">Active</span>
                    <button className="text-muted hover:text-foreground p-1 transition-colors"><span className="material-symbols-outlined text-[18px]">content_copy</span></button>
                    <button className="text-muted hover:text-brand-error p-1 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
                
                {/* Key Item */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-outline/20 bg-background/30">
                  <div>
                    <div className="text-[14px] text-foreground">Development Key</div>
                    <div className="font-mono text-muted text-[12px] mt-1">bf_test_••••••••••••2m4p</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-outline/50 text-muted">Unused (30d)</span>
                    <button className="text-muted hover:text-foreground p-1 transition-colors"><span className="material-symbols-outlined text-[18px]">content_copy</span></button>
                    <button className="text-muted hover:text-brand-error p-1 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Integrations */}
          <section id="integrations" className="space-y-6 scroll-mt-24">
            <div className="border-b border-outline/30 pb-2">
              <h3 className="text-[20px] font-medium text-foreground">Integrations</h3>
              <p className="text-[14px] text-muted mt-1">Connect external platforms to BrandForge.</p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-outline">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/30">
                    <span className="font-bold text-[#0A66C2] text-[24px] leading-none">in</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-foreground">LinkedIn</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {hasLinkedIn ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-mono text-muted text-[12px]">Connected as User</span>
                        </>
                      ) : (
                        <span className="font-mono text-muted text-[12px]">Not connected</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {hasLinkedIn ? (
                    <button className="px-4 py-2 text-[14px] bg-surface hover:bg-surface-bright text-foreground rounded border border-outline/30 transition-colors">Disconnect</button>
                  ) : (
                    <button className="px-4 py-2 text-[14px] bg-[#0A66C2]/10 border border-[#0A66C2]/40 text-foreground hover:bg-[#0A66C2]/20 rounded transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">link</span> Connect
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] text-foreground">Auto-publish enabled</div>
                    <div className="text-[12px] text-muted mt-0.5">Automatically publish approved content to LinkedIn.</div>
                  </div>
                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Preferences */}
          <section id="preferences" className="space-y-6 scroll-mt-24">
            <div className="border-b border-outline/30 pb-2">
              <h3 className="text-[20px] font-medium text-foreground">Preferences</h3>
              <p className="text-[14px] text-muted mt-1">Customize your workspace experience.</p>
            </div>

            <div className="glass-card rounded-xl border border-outline overflow-hidden divide-y divide-outline/20">
              {/* Theme */}
              <div className="p-6 flex items-center justify-between bg-background/20">
                <div>
                  <h4 className="text-[14px] font-medium text-foreground">Interface Theme</h4>
                  <p className="text-[14px] text-muted mt-1">Select your preferred visual mode.</p>
                </div>
                <div className="flex bg-surface-dim rounded-lg p-1 border border-outline/30">
                  <button className="px-3 py-1.5 rounded-md text-[14px] font-medium text-muted hover:text-foreground">Light</button>
                  <button className="px-3 py-1.5 rounded-md text-[14px] font-medium bg-surface shadow-sm text-foreground">Dark</button>
                  <button className="px-3 py-1.5 rounded-md text-[14px] font-medium text-muted hover:text-foreground">System</button>
                </div>
              </div>

              {/* Tone */}
              <div className="p-6 flex items-center justify-between bg-background/20">
                <div className="pr-4">
                  <h4 className="text-[14px] font-medium text-foreground">Default Writing Tone</h4>
                  <p className="text-[14px] text-muted mt-1">The default persona AI will use when drafting content.</p>
                </div>
                <div className="relative w-48 shrink-0">
                  <select className="w-full bg-background/50 border border-outline/50 rounded-lg py-2 pl-3 pr-8 appearance-none text-[14px] text-foreground focus:outline-none focus:border-primary">
                    <option value="professional">Professional</option>
                    <option value="casual">Casual & Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="creative">Creative / Witty</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted">
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-6 flex items-center justify-between bg-background/20">
                <div>
                  <h4 className="text-[14px] font-medium text-foreground">Email Notifications</h4>
                  <p className="text-[14px] text-muted mt-1">Receive updates on generated content and system alerts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Save Actions */}
          <div className="pt-6 border-t border-outline/30 flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded text-[14px] font-medium text-foreground bg-transparent border border-outline/50 hover:bg-surface transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 rounded text-[14px] font-medium text-on-primary bg-primary hover:bg-primary-container transition-all shadow-[0_0_15px_rgba(192,193,255,0.1)] hover:shadow-[0_0_20px_rgba(192,193,255,0.2)]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
