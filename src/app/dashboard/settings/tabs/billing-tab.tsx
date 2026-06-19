'use client'

export function BillingTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[18px] font-medium text-foreground mb-4">Current Plan</h3>
        <div className="glass-panel p-6 rounded-xl border border-primary/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-on-primary text-[10px] font-mono uppercase tracking-widest rounded-bl-lg">Active</div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-[24px] font-semibold text-foreground">Student Developer</h4>
              <p className="text-[14px] text-muted mt-1">Free Tier via Google AI Studio</p>
            </div>
            <div className="text-right">
              <span className="text-[32px] font-bold text-foreground">$0</span>
              <span className="text-muted">/mo</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[12px] font-mono">
                <span className="text-muted">API Generations (Google Gemini)</span>
                <span className="text-primary">15 RPM</span>
              </div>
              <div className="w-full h-2 bg-surface-dim rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full opacity-50"></div>
              </div>
              <p className="text-[11px] text-muted text-right">Generous free tier active</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[18px] font-medium text-foreground mb-4">Upgrade Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-xl border border-outline opacity-60">
            <h4 className="text-[18px] font-medium text-foreground mb-2">Pro Creator</h4>
            <div className="text-[24px] font-bold text-foreground mb-4">$15<span className="text-[14px] text-muted font-normal">/mo</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Unlimited GPT-4o Generations</li>
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Advanced Analytics</li>
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Auto-publishing to 3 platforms</li>
            </ul>
            <button disabled className="w-full py-2 rounded border border-outline bg-background/50 text-muted font-medium cursor-not-allowed">Coming Soon</button>
          </div>
          
          <div className="glass-card p-6 rounded-xl border border-outline opacity-60">
            <h4 className="text-[18px] font-medium text-foreground mb-2">Enterprise</h4>
            <div className="text-[24px] font-bold text-foreground mb-4">$49<span className="text-[14px] text-muted font-normal">/mo</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Custom AI Models fine-tuned on you</li>
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Dedicated Background Agents</li>
              <li className="flex items-center gap-2 text-[13px] text-muted"><span className="material-symbols-outlined text-[16px] text-primary">check</span> White-labeled reporting</li>
            </ul>
            <button disabled className="w-full py-2 rounded border border-outline bg-background/50 text-muted font-medium cursor-not-allowed">Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  )
}
