'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard',           label: 'Dashboard',        icon: 'dashboard' },
  { href: '/dashboard/content',   label: 'Content Studio',   icon: 'edit_note' },
  { href: '/dashboard/images',    label: 'Image Studio',     icon: 'image_search' },
  { href: '/dashboard/publish',   label: 'Publishing Center',icon: 'send' },
  { href: '/dashboard/analytics', label: 'Analytics',        icon: 'insights' },
  { href: '/dashboard/agents',    label: 'AI Agents',        icon: 'smart_toy' },
  { href: '/dashboard/settings',  label: 'Settings',         icon: 'settings' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col h-full py-6 px-4 fixed left-0 top-0 w-[280px] bg-[#1a1b22] border-r border-[#464554] z-50">
      {/* Header */}
      <div className="mb-8 px-2 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-[#c0c1ff]/20 flex items-center justify-center border border-[#c0c1ff]/30">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div>
          <h1 className="text-[20px] font-semibold text-[#e2e1eb] tracking-tight leading-tight">ThoughtGrid</h1>
          <p className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-widest mt-0.5">Enterprise Suite</p>
        </div>
      </div>

      {/* New Post CTA */}
      <Link
        href="/dashboard/content"
        className="mb-8 w-full py-2.5 px-4 bg-[#e2e1eb] text-[#12131a] rounded-sm font-mono text-[12px] font-medium hover:bg-[#c0c1ff] transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        <span>New Post</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-sm transition-colors duration-200 ${
                isActive
                  ? 'text-[#c0c1ff] font-bold border-r-2 border-[#c0c1ff] bg-[#383940]/30'
                  : 'text-[#c7c4d7] hover:text-[#e2e1eb] hover:bg-[#383940]/20'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[14px]">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-[#464554]/50">
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-sm text-[#c7c4d7] hover:text-[#e2e1eb] hover:bg-[#383940]/20 transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
          <span className="text-[14px]">Support</span>
        </Link>
      </div>
    </nav>
  )
}
