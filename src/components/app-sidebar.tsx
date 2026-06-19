import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutDashboard, Image as ImageIcon, Send, BarChart2, Settings, Sparkles } from "lucide-react"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Content Studio", url: "/dashboard/content", icon: Sparkles },
  { title: "Image Studio", url: "/dashboard/images", icon: ImageIcon },
  { title: "Publishing Center", url: "/dashboard/publish", icon: Send },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart2 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/10 bg-[#0A0A0A] text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400 font-bold mb-4 tracking-widest text-xs px-4 mt-4 uppercase">
            ThoughtGrid
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<a href={item.url} />} 
                    className="flex items-center gap-3 hover:bg-indigo-500/10 hover:text-indigo-400 text-zinc-300 py-6"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
