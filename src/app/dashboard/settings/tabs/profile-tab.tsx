'use client'

import Image from 'next/image'

export function ProfileTab({ email, fullName, avatarUrl }: { email: string, fullName: string, avatarUrl: string }) {
  const [firstName, lastName] = (fullName || '').split(' ')
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-surface-dim border border-outline flex items-center justify-center overflow-hidden relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[40px] text-muted">person</span>
            )}
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10">
              <span className="material-symbols-outlined text-foreground">photo_camera</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[18px] font-medium text-foreground">Profile Picture</h3>
          <p className="text-[12px] text-muted mb-3 mt-1">Recommended 400x400px. Max 2MB.</p>
          <button className="px-4 py-1.5 rounded bg-surface border border-outline hover:border-primary/50 hover:text-primary transition-colors text-[13px] font-medium text-foreground">
            Upload New
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">First Name</label>
            <input
              type="text"
              defaultValue={firstName || "User"}
              className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Last Name</label>
            <input
              type="text"
              defaultValue={lastName || "Name"}
              className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Email Address</label>
          <input
            type="email"
            defaultValue={email || "user@example.com"}
            className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Professional Bio</label>
          <textarea
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full bg-background/50 border border-outline rounded p-2.5 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      <div className="pt-4 border-t border-outline flex justify-end">
        <button className="px-5 py-2 rounded bg-primary text-on-primary text-[14px] font-medium hover:bg-primary-container transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">save</span> Save Changes
        </button>
      </div>
    </div>
  )
}
