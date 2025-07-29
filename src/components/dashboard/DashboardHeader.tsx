
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, User, Filter, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden hover:bg-primary/10 transition-colors" />
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back! Ready to continue your learning journey?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Enhanced Search */}
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
            <Input
              placeholder="Search courses, topics, assignments..."
              className="pl-10 w-64 lg:w-80 glass border-border/40 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300 hover:border-primary/30"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-primary/10"
            >
              <Filter className="h-3 w-3" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 transition-colors group"
            >
              <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive hover:bg-destructive/90 text-xs animate-pulse">
                3
              </Badge>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 transition-colors group"
            >
              <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
