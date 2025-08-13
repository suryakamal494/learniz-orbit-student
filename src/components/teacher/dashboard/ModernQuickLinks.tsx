
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Plus, BookOpen, Calendar, FileText, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const quickActions = [
  {
    title: "Create Exam",
    description: "Design assessments",
    icon: FileText,
    path: "/teacher/exams/create",
    recentCount: "12 this month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Schedule Class",
    description: "Plan live sessions", 
    icon: Calendar,
    path: "/teacher/schedule/create",
    recentCount: "8 upcoming",
    iconBg: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "LMS Content",
    description: "Upload materials",
    icon: BookOpen,
    path: "/teacher/lms/content/create",
    recentCount: "24 published",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Video Series",
    description: "Create playlists",
    icon: Video,
    path: "/teacher/lms/series/create",
    recentCount: "5 series",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  }
]

export function ModernQuickLinks() {
  const navigate = useNavigate()

  return (
    <Card className="shadow-sm border border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Frequently used tools</p>
          </div>
          <Badge variant="secondary">4 tools</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="group cursor-pointer border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-200"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${action.iconBg}`}>
                    <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {action.recentCount}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
