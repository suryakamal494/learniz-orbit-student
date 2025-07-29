
import { SubjectsGrid } from "./SubjectsGrid"
import { LatestUpdates } from "./LatestUpdates"
import { DashboardHeader } from "./DashboardHeader"

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex-1 p-4 md:p-8 space-y-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <SubjectsGrid />
          </div>
          <div className="xl:col-span-1">
            <LatestUpdates />
          </div>
        </div>
      </div>
    </div>
  )
}
