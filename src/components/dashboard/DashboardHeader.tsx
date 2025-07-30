
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileDropdown } from "./ProfileDropdown"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <SidebarTrigger className="lg:hidden flex-shrink-0 h-9 w-9 hover:bg-primary/10 transition-colors rounded-md" />
            <div className="animate-fade-in min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient truncate">
                Dashboard
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Quick Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 sm:h-10 sm:w-10 hover:bg-primary/10 transition-colors group rounded-md"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-destructive hover:bg-destructive/90 text-xs animate-pulse">
                  3
                </Badge>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-primary/10 transition-colors group rounded-md"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:rotate-90" />
              </Button>
              
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
