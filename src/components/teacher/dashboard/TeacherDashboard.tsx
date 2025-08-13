
import { TeacherDashboardHeader } from "./TeacherDashboardHeader"
import { ModernTeacherStats } from "./ModernTeacherStats"
import { ModernQuickLinks } from "./ModernQuickLinks"
import { ModernUpcomingClasses } from "./ModernUpcomingClasses"
import { ModernBatchReports } from "./ModernBatchReports"
import { ModernAttendanceToday } from "./ModernAttendanceToday"
import { RecentActivity } from "./RecentActivity"

export function TeacherDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <TeacherDashboardHeader />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 space-y-8">
          {/* Quick Actions */}
          <div className="animate-slide-up stagger-1">
            <ModernQuickLinks />
          </div>
          
          {/* Performance Stats */}
          <div className="animate-slide-up stagger-2">
            <ModernTeacherStats />
          </div>
          
          {/* Upcoming Classes */}
          <div className="animate-slide-up stagger-3">
            <ModernUpcomingClasses />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Batch Reports and Attendance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="animate-slide-up stagger-4">
                  <ModernBatchReports />
                </div>
                <div className="animate-slide-up stagger-5">
                  <ModernAttendanceToday />
                </div>
              </div>
            </div>
            
            <div className="xl:col-span-1 animate-slide-up stagger-6">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
