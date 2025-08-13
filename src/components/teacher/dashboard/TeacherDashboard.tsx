
import { TeacherDashboardHeader } from "./TeacherDashboardHeader"
import { TeacherStats } from "./TeacherStats"
import { QuickLinks } from "./QuickLinks"
import { TodaysClasses } from "./TodaysClasses"
import { BatchReports } from "./BatchReports"
import { AttendanceToday } from "./AttendanceToday"
import { RecentActivity } from "./RecentActivity"

export function TeacherDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <TeacherDashboardHeader />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Quick Links */}
          <div className="animate-slide-up stagger-1">
            <QuickLinks />
          </div>
          
          {/* Teacher Stats */}
          <div className="animate-slide-up stagger-2">
            <TeacherStats />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Today's Classes */}
              <div className="animate-slide-up stagger-3">
                <TodaysClasses />
              </div>
              
              {/* Batch Reports and Attendance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="animate-slide-up stagger-4">
                  <BatchReports />
                </div>
                <div className="animate-slide-up stagger-5">
                  <AttendanceToday />
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
