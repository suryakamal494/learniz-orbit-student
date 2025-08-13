
import { TeacherDashboardHeader } from "./TeacherDashboardHeader"
import { ModernTeacherStats } from "./ModernTeacherStats"
import { ModernQuickLinks } from "./ModernQuickLinks"
import { ModernUpcomingClasses } from "./ModernUpcomingClasses"
import { ModernBatchReports } from "./ModernBatchReports"
import { ModernAttendanceToday } from "./ModernAttendanceToday"
import { RecentActivity } from "./RecentActivity"

export function TeacherDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TeacherDashboardHeader />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
          {/* Quick Actions */}
          <ModernQuickLinks />
          
          {/* Performance Stats */}
          <ModernTeacherStats />
          
          {/* Upcoming Classes */}
          <ModernUpcomingClasses />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Batch Reports and Attendance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernBatchReports />
                <ModernAttendanceToday />
              </div>
            </div>
            
            <div className="xl:col-span-1">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
