import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-transparent">
      <AppSidebar />
      {/* Main content offset by sidebar width */}
      <div className="flex-1 flex flex-col md:ml-[280px] overflow-hidden">
        {/* Top App Bar */}
        <header className="flex justify-between items-center h-16 px-6 glass-panel border-b border-outline sticky top-0 z-40 flex-shrink-0">
          {/* Search */}
          <div className="flex-1 flex items-center max-w-md hidden md:flex">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted text-[20px]">search</span>
              <input
                className="w-full bg-background/50 border border-outline rounded-sm py-2 pl-10 pr-4 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-muted/50"
                placeholder="Search insights, drafts, commands..."
                type="text"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-[10px] uppercase tracking-widest pulse-border">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>AI Status: Optimal</span>
            </div>
            <ThemeToggle />
            <button className="text-muted hover:text-primary transition-colors relative w-8 h-8 flex items-center justify-center rounded-sm hover:bg-surface-bright/30">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
            </button>
            <button className="text-muted hover:text-primary transition-colors relative w-8 h-8 flex items-center justify-center rounded-sm hover:bg-surface-bright/30">
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
