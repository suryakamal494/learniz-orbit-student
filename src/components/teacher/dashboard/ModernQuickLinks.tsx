
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Plus, BookOpen, Calendar, FileText, Video, Users, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const quickActions = [
  {
    title: "Create Exam",
    description: "Design assessments",
    icon: FileText,
    path: "/teacher/exams/create",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    recentCount: "12 this month",
    bgPattern: "bg-gradient-to-br"
  },
  {
    title: "Schedule Class",
    description: "Plan live sessions", 
    icon: Calendar,
    path: "/teacher/schedule/create",
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    recentCount: "8 upcoming",
    bgPattern: "bg-gradient-to-br"
  },
  {
    title: "LMS Content",
    description: "Upload materials",
    icon: BookOpen,
    path: "/teacher/lms/content/create",
    gradient: "from-purple-500 via-violet-600 to-purple-700",
    recentCount: "24 published",
    bgPattern: "bg-gradient-to-br"
  },
  {
    title: "Video Series",
    description: "Create playlists",
    icon: Video,
    path: "/teacher/lms/series/create",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    recentCount: "5 series",
    bgPattern: "bg-gradient-to-br"
  }
]

export function ModernQuickLinks() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
        <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
        <Badge variant="secondary" className="ml-auto">4 tools</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card
            key={action.title}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(action.path)}
          >
            <div className={`absolute inset-0 ${action.bgPattern} ${action.gradient} opacity-90`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            
            <CardContent className="relative p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                  <action.icon className="h-6 w-6" />
                </div>
                <Plus className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-white/90 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-white/80 group-hover:text-white/70 transition-colors">
                  {action.description}
                </p>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {action.recentCount}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
