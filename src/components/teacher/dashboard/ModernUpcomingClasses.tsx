
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Play, Users, Clock, Calendar, ExternalLink, MoreVertical } from "lucide-react"
import { mockUpcomingClasses } from "@/data/mockUpcomingClasses"

export function ModernUpcomingClasses() {
  const navigate = useNavigate()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Live': return '🔴'
      case 'Lab': return '🧪'
      case 'Discussion': return '💬'
      case 'Review': return '📝'
      default: return '📚'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse'
      case 'upcoming': return 'bg-green-500'
      case 'completed': return 'bg-gray-400'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
          <h2 className="text-xl font-bold text-foreground">Upcoming Classes</h2>
          <Badge variant="secondary">{mockUpcomingClasses.length} scheduled</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/schedule')}>
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockUpcomingClasses.slice(0, 6).map((classItem, index) => (
          <Card
            key={classItem.id}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${classItem.color} opacity-90`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            
            <CardContent className="relative p-5 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(classItem.type)}</span>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {classItem.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(classItem.status)}`}></div>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-white/90 transition-colors">
                  {classItem.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{classItem.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-white/80">
                    <Users className="h-4 w-4" />
                    <span>{classItem.enrolledStudents} students</span>
                  </div>
                  <div className="text-sm text-white/80">
                    {classItem.completionRate}% completion
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (classItem.streamingUrl) {
                        window.open(classItem.streamingUrl, '_blank')
                      }
                    }}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start Class
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/teacher/schedule/assign/${classItem.id}`)
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-300"
                    style={{ width: `${classItem.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
