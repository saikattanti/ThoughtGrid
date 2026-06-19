import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return redirect('/login')

  const email = user.email || ''
  const fullName = user.user_metadata?.full_name || ''
  const avatarUrl = user.user_metadata?.avatar_url || ''
  
  const [firstName, lastName] = (fullName || '').split(' ')

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      {/* Page Header */}
      <div className="mb-8 relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-[16px] text-muted">Manage your personal information and biography.</p>
        </div>
        <Link href="/dashboard/settings" className="px-4 py-2 bg-surface hover:bg-surface-bright border border-outline/30 rounded text-[14px] text-foreground transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">settings</span> Settings
        </Link>
      </div>

      <div className="glass-card p-8 rounded-xl border border-outline relative z-10">
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-8 border-b border-outline/30">
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

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[13px] font-medium text-foreground mb-2 block">First Name</label>
                <input
                  type="text"
                  defaultValue={firstName || "User"}
                  className="w-full bg-background/50 border border-outline/50 rounded-lg p-3 text-[14px] text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-foreground mb-2 block">Last Name</label>
                <input
                  type="text"
                  defaultValue={lastName || "Name"}
                  className="w-full bg-background/50 border border-outline/50 rounded-lg p-3 text-[14px] text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-foreground mb-2 block">Email Address</label>
              <input
                type="email"
                defaultValue={email || "user@example.com"}
                disabled
                className="w-full bg-surface-dim/50 border border-outline/30 rounded-lg p-3 text-[14px] text-muted cursor-not-allowed"
              />
              <p className="text-[12px] text-muted mt-1.5">Email address is managed by your authentication provider.</p>
            </div>

            <div>
              <label className="text-[13px] font-medium text-foreground mb-2 block">Professional Bio</label>
              <textarea
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full bg-background/50 border border-outline/50 rounded-lg p-3 text-[14px] text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-outline/30 flex justify-end">
            <button className="px-6 py-2.5 rounded text-[14px] font-medium text-on-primary bg-primary hover:bg-primary-container transition-all shadow-[0_0_15px_rgba(192,193,255,0.1)] hover:shadow-[0_0_20px_rgba(192,193,255,0.2)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
