
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
          className="fixed top-4 left-4 z-[100] h-10 w-10 bg-white shadow-lg border-gray-200 hover:bg-gray-50 hover:border-primary transition-all duration-200"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </Button>
      )}
      
      <Sidebar className="border-r border-gray-200 bg-white shadow-sm z-50">
        <SidebarHeader className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">Learniz</span>
                  <span className="text-xs text-gray-500">Student Portal</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 bg-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 font-medium mb-3 px-2">
              {!isCollapsed && "Navigation"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        relative rounded-lg transition-all duration-200 hover:bg-gray-100
                        group h-11 border border-transparent
                        ${isActive(item.url) 
                          ? 'bg-primary/10 text-primary border-primary/20 shadow-sm font-medium' 
                          : 'text-gray-700 hover:text-gray-900 hover:border-gray-200'
                        }
                      `}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className={`h-5 w-5 transition-all duration-200 ${isActive(item.url) ? 'text-primary' : 'group-hover:scale-105'}`} />
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
