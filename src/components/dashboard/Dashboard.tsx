
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 max-w-7xl">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-4 md:space-y-6">
              {/* Live Quiz Section */}
              <section className="animate-slide-up stagger-1" aria-label="Live Quiz">
                <LiveQuiz data={mockLiveQuizData} />
              </section>
              
              {/* Subjects Grid */}
              <section className="animate-slide-up stagger-2" aria-label="Subjects">
                <SubjectsGrid />
              </section>
            </div>

            {/* Sidebar Content */}
            <aside className="xl:col-span-1 animate-slide-up stagger-3">
              <div className="sticky top-6">
                <LatestUpdates />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
