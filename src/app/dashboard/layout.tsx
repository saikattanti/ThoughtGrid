import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#12131a]">
      <AppSidebar />
      {/* Main content offset by sidebar width */}
      <div className="flex-1 flex flex-col md:ml-[280px] overflow-hidden">
        {/* Top App Bar */}
        <header className="flex justify-between items-center h-16 px-6 bg-[#12131a]/80 backdrop-blur-md border-b border-[#464554] sticky top-0 z-40 flex-shrink-0">
          {/* Search */}
          <div className="flex-1 flex items-center max-w-md hidden md:flex">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c7c4d7] text-[20px]">search</span>
              <input
                className="w-full bg-[#1a1b22] border border-[#464554] rounded-sm py-2 pl-10 pr-4 text-[14px] text-[#e2e1eb] focus:outline-none focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] transition-colors placeholder:text-[#c7c4d7]/50"
                placeholder="Search insights, drafts, commands..."
                type="text"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#c0c1ff]/30 bg-[#c0c1ff]/5 text-[#c0c1ff] font-mono text-[10px] uppercase tracking-widest pulse-border">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-pulse"></span>
              <span>AI Status: Optimal</span>
            </div>
            <button className="text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors relative w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#383940]/30">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#c0c1ff] rounded-full"></span>
            </button>
            <button className="text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors relative w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#383940]/30">
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
