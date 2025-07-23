
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Welcome back! Ready to continue your learning journey?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses, topics..."
              className="pl-10 w-64 bg-background/50 border-border/40 focus:border-primary/40"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
