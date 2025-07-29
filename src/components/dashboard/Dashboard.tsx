
import { SubjectsGrid } from "./SubjectsGrid"
import { LatestUpdates } from "./LatestUpdates"
import { DashboardHeader } from "./DashboardHeader"
import { QuickStats } from "./QuickStats"

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />
      
      <div className="flex-1 p-4 md:p-8 space-y-8">
        {/* Quick Stats */}
        <div className="animate-fade-in">
          <QuickStats />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 animate-slide-up stagger-1">
            <SubjectsGrid />
          </div>
          <div className="xl:col-span-1 animate-slide-up stagger-2">
            <LatestUpdates />
          </div>
        </div>
      </div>
    </div>
  )
}
