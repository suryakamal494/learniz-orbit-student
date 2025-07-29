
import { User, GraduationCap, BookOpen, Lock, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function ProfileDropdown() {
  const studentData = {
    name: "John Doe",
    class: "Class 12 - Science",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white shadow-lg border border-border/50 z-[100]">
        <DropdownMenuLabel className="pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{studentData.name}</p>
              <p className="text-sm text-muted-foreground">{studentData.class}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {studentData.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs px-2 py-1">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer hover:bg-muted/50">
          <Lock className="h-4 w-4 mr-2" />
          Change Password
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-muted/50 text-red-600 hover:text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
