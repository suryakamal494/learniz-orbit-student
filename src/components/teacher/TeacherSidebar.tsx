import { useState, useRef, useCallback } from "react"
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
  Users,
  FileText,
  Zap,
  BookOpen,
  Presentation,
  ChevronDown
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
import { SidebarHoverMenu } from "./sidebar/SidebarHoverMenu"

const navigationItems = [
  { title: "Dashboard", url: "/teacher", icon: LayoutDashboard, badge: null },
  { title: "Student Batches", url: "/teacher/batches", icon: Users, badge: "8" },
  { title: "Exams", url: "/teacher/exams", icon: FileText, badge: null, hasSubmenu: true },
  { title: "Live Quizzes", url: "/teacher/exams", icon: Zap, badge: null },
  { title: "LMS", url: "/teacher/lms", icon: BookOpen, badge: null, hasSubmenu: true },
  { title: "Academic Schedule", url: "/teacher/schedule", icon: Calendar, badge: "2" },
  { title: "Reports", url: "/teacher/reports", icon: Presentation, badge: null, hasSubmenu: true },
  { title: "Notifications", url: "/teacher/notifications", icon: Bell, badge: "3" },
  { title: "Messages", url: "/teacher/messages", icon: MessageCircle, badge: "7" },
]

const submenuItems = {
  "Exams": [
    { title: "Question Bank", url: "/teacher/question-bank", emoji: "❓" },
    { title: "Directory", url: "/teacher/directory", emoji: "🔀" },
    { title: "Exams", url: "/teacher/exams", emoji: "⏱️" },
    { title: "Instructions", url: "/teacher/instructions", emoji: "📂" },
  ],
  "LMS": [
    { title: "Content", url: "/teacher/lms/content", emoji: "📚" },
    { title: "Series", url: "/teacher/lms/series", emoji: "📖" },
    { title: "Content Library", url: "/teacher/lms/library", emoji: "🗂️" },
    { title: "Directory", url: "/teacher/lms/directory", emoji: "📁" },
    { title: "Notes", url: "/teacher/lms/notes", emoji: "📝" },
  ],
  "Reports": [
    { title: "Attendance", url: "/teacher/reports/attendance", emoji: "📊" },
    { title: "Batch Reports", url: "/teacher/reports/batch", emoji: "📈" },
  ]
}

export function TeacherSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"
  
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 })
  const sidebarRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => currentPath === path

  const handleSubmenuClick = useCallback((item: any, event: React.MouseEvent) => {
    if (item.hasSubmenu && submenuItems[item.title as keyof typeof submenuItems]) {
      event.preventDefault()
      
      if (openSubmenu === item.title) {
        setOpenSubmenu(null)
        return
      }

      const rect = event.currentTarget.getBoundingClientRect()
      const sidebarRect = sidebarRef.current?.getBoundingClientRect()
      
      setSubmenuPosition({
        x: (sidebarRect?.right || 0) + 8,
        y: rect.top
      })
      setOpenSubmenu(item.title)
    }
  }, [openSubmenu])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element
    if (!target.closest('[data-submenu]') && !target.closest('[data-submenu-trigger]')) {
      setOpenSubmenu(null)
    }
  }, [])

  useState(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
  
  return (
    <>
      {/* Floating expand button when sidebar is collapsed */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-[100] h-12 w-12 glass shadow-modern-lg hover:shadow-modern-xl hover:scale-105 transition-all duration-300 group border-primary/20 hover:border-primary/30"
        >
          <Menu className="h-5 w-5 transition-transform group-hover:scale-110 text-primary" />
        </Button>
      )}
      
      <Sidebar 
        ref={sidebarRef}
        className="border-r-0 bg-sidebar shadow-modern-lg z-50 [&[data-mobile=true]]:bg-sidebar"
      >
        <SidebarHeader className="border-b border-sidebar-border/40 p-6 bg-gradient-to-br from-sidebar to-sidebar/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-modern">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-sidebar animate-pulse"></div>
              </div>
              
              {!isCollapsed && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-sidebar-foreground">Learniz</span>
                    <Badge variant="secondary" className="bg-accent-teal/20 text-accent-teal border-accent-teal/30 text-xs">Teacher</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Teacher Portal</span>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 hover:bg-sidebar-accent/50 transition-colors group"
              >
                <X className="h-4 w-4 transition-transform group-hover:rotate-90 text-sidebar-foreground/70" />
              </Button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-6 bg-gradient-to-b from-sidebar to-sidebar/95">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold mb-4 px-2 flex items-center gap-2">
              {!isCollapsed && (
                <>
                  <Zap className="h-4 w-4 text-accent-orange" />
                  Teacher Navigation
                </>
              )}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild={!item.hasSubmenu}
                      className={`
                        relative rounded-xl transition-all duration-300 hover:bg-primary/15 hover:shadow-sm
                        group h-12 border border-transparent backdrop-blur-sm
                        ${isActive(item.url) 
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 shadow-md font-semibold' 
                          : 'text-sidebar-foreground/80 hover:text-primary hover:border-primary/20'
                        }
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                      data-submenu-trigger={item.hasSubmenu}
                      onClick={item.hasSubmenu ? (e) => handleSubmenuClick(item, e) : undefined}
                    >
                      {item.hasSubmenu ? (
                        <div className="flex items-center gap-3 w-full animate-fade-in">
                          <div className={`
                            p-2 rounded-lg transition-all duration-300
                            ${isActive(item.url) 
                              ? 'bg-primary/25 text-primary shadow-sm' 
                              : 'group-hover:bg-primary/20 group-hover:text-primary'
                            }
                          `}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          
                          {!isCollapsed && (
                            <div className="flex items-center justify-between w-full">
                              <span className="font-semibold text-base md:text-sm text-sidebar-foreground group-hover:text-primary">
                                {item.title}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-accent-orange/20 text-accent-orange border-accent-orange/30 text-xs h-5 min-w-5 flex items-center justify-center font-semibold"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                                
                                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <NavLink to={item.url} className="flex items-center gap-3 w-full animate-fade-in">
                          <div className={`
                            p-2 rounded-lg transition-all duration-300
                            ${isActive(item.url) 
                              ? 'bg-primary/25 text-primary shadow-sm' 
                              : 'group-hover:bg-primary/20 group-hover:text-primary'
                            }
                          `}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          
                          {!isCollapsed && (
                            <div className="flex items-center justify-between w-full">
                              <span className="font-semibold text-base md:text-sm text-sidebar-foreground group-hover:text-primary">
                                {item.title}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-accent-orange/20 text-accent-orange border-accent-orange/30 text-xs h-5 min-w-5 flex items-center justify-center font-semibold"
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
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Click-based Submenu */}
      {openSubmenu && submenuItems[openSubmenu as keyof typeof submenuItems] && (
        <SidebarHoverMenu
          items={submenuItems[openSubmenu as keyof typeof submenuItems]}
          isVisible={!!openSubmenu}
          position={submenuPosition}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          isClickMode={true}
        />
      )}
    </>
  )
}
