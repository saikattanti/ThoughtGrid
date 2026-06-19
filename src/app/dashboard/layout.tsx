import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#12131a]">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="flex h-14 items-center border-b border-white/10 px-4 bg-[#12131a]">
            <SidebarTrigger className="text-white hover:text-indigo-400 mr-4" />
            <h1 className="text-sm font-medium text-white">Workspace</h1>
          </header>
          <div className="flex-1 overflow-auto p-6 text-white">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
