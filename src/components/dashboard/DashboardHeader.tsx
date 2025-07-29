
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileDropdown } from "./ProfileDropdown"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/40 backdrop-blur-xl bg-white/80">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden hover:bg-primary/10 transition-colors" />
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">
              Dashboard
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
            
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}
