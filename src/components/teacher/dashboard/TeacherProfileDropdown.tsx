
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Key, LogOut } from "lucide-react"

export function TeacherProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleChangePassword = () => {
    // TODO: Implement change password functionality
    console.log("Change password clicked")
  }

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked")
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-0 hover:bg-transparent">
          <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent-orange text-white font-semibold">
              TR
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-body-sm font-medium text-foreground">Prof. Teacher</p>
            <p className="text-body-xs text-muted-foreground">Mathematics Dept.</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg"
        sideOffset={8}
      >
        <div className="px-3 py-2 border-b border-border/30">
          <p className="font-medium text-sm text-foreground">Prof. Teacher</p>
          <p className="text-xs text-muted-foreground">Mathematics Department</p>
        </div>
        
        <DropdownMenuItem 
          onClick={handleChangePassword}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-primary/5 transition-colors"
        >
          <Key className="h-4 w-4 text-blue-600" />
          <span>Change Password</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
