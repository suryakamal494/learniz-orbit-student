
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  BookOpen, 
  Users, 
  Calendar,
  Play,
  FileText,
  Bell
} from "lucide-react"

const todayClasses = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Differential Equations",
    time: "10:00 AM",
    duration: "60 min",
    type: "Live Class",
    instructor: "Dr. Smith",
    status: "upcoming",
    color: "blue"
  },
  {
    id: 2,
    subject: "Chemistry",
    topic: "Organic Reactions",
    time: "1:30 PM",
    duration: "45 min",
    type: "Lab Session",
    instructor: "Prof. Johnson",
    status: "upcoming",
    color: "green"
  },
  {
    id: 3,
    subject: "Physics",
    topic: "Quantum Mechanics",
    time: "3:00 PM",
    duration: "60 min",
    type: "Discussion",
    instructor: "Dr. Brown",
    status: "completed",
    color: "purple"
  }
]

const lmsUpdates = [
  {
    id: 1,
    type: "assignment",
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "Due Tomorrow",
    priority: "high",
    icon: FileText,
    color: "green"
  },
  {
    id: 2,
    type: "material",
    title: "Physics Chapter 12 Notes",
    subject: "Physics", 
    dueDate: "Posted 2 hours ago",
    priority: "medium",
    icon: BookOpen,
    color: "purple"
  },
  {
    id: 3,
    type: "announcement",
    title: "Math Quiz Next Week",
    subject: "Mathematics",
    dueDate: "Scheduled for Monday",
    priority: "low",
    icon: Bell,
    color: "blue"
  }
]

const getSubjectColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-800"
      }
    case "green":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        badge: "bg-green-100 text-green-800"
      }
    case "purple":
      return {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700",
        badge: "bg-purple-100 text-purple-800"
      }
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        badge: "bg-gray-100 text-gray-800"
      }
  }
}

export function LatestUpdates() {
  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayClasses.map((classItem) => {
            const colorClasses = getSubjectColorClasses(classItem.color)
            return (
              <div 
                key={classItem.id}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md
                  ${classItem.status === 'completed' 
                    ? 'bg-muted/50 border-border/50 opacity-70' 
                    : `${colorClasses.bg} ${colorClasses.border} hover:border-primary/40`
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={classItem.status === 'completed' ? 'secondary' : 'default'} className={colorClasses.badge}>
                      {classItem.type}
                    </Badge>
                    <span className={`text-sm font-medium ${colorClasses.text}`}>{classItem.subject}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {classItem.time}
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-2">{classItem.topic}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {classItem.instructor}
                  </div>
                  {classItem.status === 'upcoming' && (
                    <Button 
                      size="sm" 
                      className="h-8 text-xs bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Join
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Latest LMS Updates */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lmsUpdates.map((update) => {
            const colorClasses = getSubjectColorClasses(update.color)
            return (
              <div 
                key={update.id} 
                className="p-3 rounded-lg border bg-background hover:bg-muted/20 transition-all duration-200 cursor-pointer hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg flex-shrink-0 ${colorClasses.bg} ${colorClasses.border} border
                  `}>
                    <update.icon className={`h-4 w-4 ${colorClasses.text}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{update.title}</p>
                      <Badge variant="outline" className={`text-xs shrink-0 ${colorClasses.badge}`}>
                        {update.subject}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{update.dueDate}</p>
                  </div>
                </div>
              </div>
            )
          })}
          
          <Button variant="outline" className="w-full mt-3 hover:bg-primary/5 hover:border-primary/40 transition-colors" size="sm">
            View All Updates
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
