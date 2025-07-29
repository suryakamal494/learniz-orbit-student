
import { SubjectsGrid } from "./SubjectsGrid"
import { LatestUpdates } from "./LatestUpdates"
import { DashboardHeader } from "./DashboardHeader"
import { LiveQuiz } from "./LiveQuiz"
import { mockLiveQuizData } from "@/data/mockLiveQuizzes"

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Live Quiz Section */}
              <div className="animate-slide-up stagger-1">
                <LiveQuiz data={mockLiveQuizData} />
              </div>
              
              {/* Subjects Grid */}
              <div className="animate-slide-up stagger-2">
                <SubjectsGrid />
              </div>
            </div>
            <div className="xl:col-span-1 animate-slide-up stagger-3">
              <LatestUpdates />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
