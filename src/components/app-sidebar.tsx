
import { useState } from "react"
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  MessageCircle, 
  Bell,
  GraduationCap,
  ChevronRight,
  Menu,
  X
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
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Academic Schedule", url: "/schedule", icon: Calendar },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Notifications", url: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  
  return (
    <>
      {/* Floating expand button when sidebar is collapsed */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 h-10 w-10 bg-card shadow-lg border-2 hover:bg-accent hover:scale-105 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <Sidebar className="border-r border-border bg-sidebar shadow-xl">
        <SidebarHeader className="border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-sidebar-foreground">Learniz</span>
                  <span className="text-xs text-sidebar-foreground/60">Student Portal</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 hover:bg-sidebar-accent/80 text-sidebar-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/50 font-medium mb-3 px-2">
              {!isCollapsed && "Navigation"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        relative rounded-xl transition-all duration-200 hover:bg-sidebar-accent/80
                        group hover:scale-[1.02] h-12
                        ${isActive(item.url) 
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className={`h-5 w-5 transition-all duration-200 ${isActive(item.url) ? 'text-primary' : 'group-hover:scale-110'}`} />
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
    </>
  )
}
