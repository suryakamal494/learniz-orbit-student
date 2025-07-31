
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Settings, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeacherDashboardHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden hover:bg-primary/10 transition-colors" />
          <div className="animate-fade-in">
            <h1 className="text-display-sm font-bold bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 transition-colors group"
            >
              <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 transition-colors group"
            >
              <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent-orange hover:bg-accent-orange/90 text-xs animate-pulse">
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
            
            {/* Teacher Profile */}
            <div className="flex items-center gap-2 ml-2">
              <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent-orange text-white font-semibold">
                  TR
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-body-sm font-medium text-foreground">Prof. Teacher</p>
                <p className="text-body-xs text-muted-foreground">Mathematics Dept.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
