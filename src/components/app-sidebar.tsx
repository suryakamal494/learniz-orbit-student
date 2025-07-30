
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
  X,
  Zap
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
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, badge: null },
  { title: "Academic Schedule", url: "/schedule", icon: Calendar, badge: "3" },
  { title: "Analysis", url: "/analysis", icon: BarChart3, badge: null },
  { title: "Messages", url: "/messages", icon: MessageCircle, badge: "12" },
  { title: "Notifications", url: "/notifications", icon: Bell, badge: "5" },
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
          className="fixed top-4 left-4 z-[100] h-12 w-12 glass shadow-modern-lg hover:shadow-modern-xl hover:scale-105 transition-all duration-300 group"
        >
          <Menu className="h-5 w-5 transition-transform group-hover:scale-110" />
        </Button>
      )}
      
      <Sidebar className="border-r-0 glass shadow-modern-lg z-50">
        <SidebarHeader className="border-b border-border/40 p-6 glass-strong">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-modern">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              {!isCollapsed && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">Learniz</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Pro</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Student Portal</span>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 hover:bg-muted/50 transition-colors group"
              >
                <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </Button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-6 glass">
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground font-semibold mb-4 px-2 flex items-center gap-2">
              {!isCollapsed && (
                <>
                  <Zap className="h-4 w-4" />
                  Navigation
                </>
              )}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        relative rounded-xl transition-all duration-300 hover:bg-primary/10
                        group h-12 border border-transparent backdrop-blur-sm
                        ${isActive(item.url) 
                          ? 'bg-primary/15 text-primary border-primary/30 shadow-modern font-semibold' 
                          : 'text-foreground hover:text-primary hover:border-border/50'
                        }
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 w-full animate-fade-in">
                        <div className={`
                          p-2 rounded-lg transition-all duration-300
                          ${isActive(item.url) 
                            ? 'bg-primary/25 text-primary' 
                            : 'group-hover:bg-primary/15 group-hover:text-primary'
                          }
                        `}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        
                        {!isCollapsed && (
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{item.title}</span>
                            
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <Badge 
                                  variant="secondary" 
                                  className="bg-primary/15 text-primary text-xs h-5 min-w-5 flex items-center justify-center"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              
                              {isActive(item.url) && (
                                <ChevronRight className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
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
