
import { SidebarProvider } from "@/components/ui/sidebar"
import { TeacherSidebar } from "../TeacherSidebar"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-pastel-blue-50 via-background to-pastel-purple-50">
        <TeacherSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
