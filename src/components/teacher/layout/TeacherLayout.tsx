
import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TeacherSidebar } from "../TeacherSidebar"

export function TeacherLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TeacherSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
