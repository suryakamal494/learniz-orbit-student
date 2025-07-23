
import { useState } from "react"
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  MessageCircle, 
  Bell,
  GraduationCap,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Academic Schedule", url: "/schedule", icon: Calendar },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Notifications", url: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  
  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-sidebar via-sidebar to-sidebar/80 backdrop-blur-sm">
      <SidebarHeader className="border-b border-border/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">Learniz</span>
              <span className="text-xs text-sidebar-foreground/70">Student Portal</span>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      relative rounded-lg transition-all duration-200 hover:bg-sidebar-accent/80
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-l-2 border-primary shadow-sm' 
                        : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-primary' : ''}`} />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {isActive(item.url) && (
                            <ChevronRight className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </>
                      )}
                    </NavLink>
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
