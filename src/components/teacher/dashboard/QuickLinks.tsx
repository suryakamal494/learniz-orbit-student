
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Plus, BookOpen, Calendar, FileText, Video } from "lucide-react"

const quickLinks = [
  {
    title: "Exams",
    icon: FileText,
    path: "/teacher/exams/create",
    gradient: "from-pastel-blue-400 to-pastel-blue-600"
  },
  {
    title: "Class",
    icon: Calendar,
    path: "/teacher/schedule/create",
    gradient: "from-pastel-green-400 to-pastel-green-600"
  },
  {
    title: "LMS Content",
    icon: BookOpen,
    path: "/teacher/lms/content/create",
    gradient: "from-pastel-purple-400 to-pastel-purple-600"
  },
  {
    title: "LMS Series",
    icon: Video,
    path: "/teacher/lms/series/create",
    gradient: "from-pastel-peach-400 to-pastel-peach-600"
  }
]

export function QuickLinks() {
  const navigate = useNavigate()

  return (
    <Card className="border-2 border-primary/10 shadow-pastel-md backdrop-blur-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-gradient-pastel-primary">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-primary">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickLinks.map((link, index) => (
            <Button
              key={link.title}
              onClick={() => navigate(link.path)}
              className="h-auto p-4 flex-col gap-3 hover:scale-105 transition-all duration-300 group animate-fade-in border-2 border-primary/10 bg-white/90 hover:bg-primary/5 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
              variant="outline"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient} shadow-pastel-md group-hover:shadow-pastel-lg transition-all duration-300`}>
                <link.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Plus className="h-3 w-3" />
                  <span>{link.title}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
