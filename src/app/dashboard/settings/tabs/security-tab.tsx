'use client'

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border border-outline">
        <h3 className="text-[16px] font-medium text-foreground mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">password</span>
          Change Password
        </h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Current Password</label>
            <input
              type="password"
              className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">New Password</label>
            <input
              type="password"
              className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Confirm New Password</label>
            <input
              type="password"
              className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <button className="mt-2 px-5 py-2 rounded bg-surface border border-outline text-foreground text-[14px] font-medium hover:border-primary transition-all">
            Update Password
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border border-outline">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-medium text-foreground flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-error text-[20px]">delete_forever</span>
              Danger Zone
            </h3>
            <p className="text-[12px] text-muted mt-1">Permanently delete your account and all associated data.</p>
          </div>
          <button className="px-5 py-2 rounded border border-brand-error/50 text-brand-error hover:bg-brand-error hover:text-brand-on-error transition-all text-[14px] font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
