
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
      {/* Always visible expand button when sidebar is collapsed */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-[100] h-10 w-10 bg-white shadow-xl border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 hover:scale-110 transition-all duration-200"
        >
          <Menu className="h-5 w-5 text-primary" />
        </Button>
      )}
      
      <Sidebar className="border-r border-border/60 bg-white shadow-2xl z-50">
        <SidebarHeader className="border-b border-border/30 p-4 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-foreground">Learniz</span>
                  <span className="text-xs text-muted-foreground">Student Portal</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 bg-gradient-to-b from-background to-background/50">
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground font-medium mb-3 px-2">
              {!isCollapsed && "Navigation"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        relative rounded-xl transition-all duration-200 hover:bg-primary/10
                        group hover:scale-[1.02] h-12 border border-transparent
                        ${isActive(item.url) 
                          ? 'bg-primary/15 text-primary border-primary/30 shadow-md font-medium' 
                          : 'text-foreground/70 hover:text-foreground hover:border-primary/20'
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
