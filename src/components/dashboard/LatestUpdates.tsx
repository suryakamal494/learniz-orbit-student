
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
    status: "upcoming"
  },
  {
    id: 2,
    subject: "Chemistry",
    topic: "Organic Reactions",
    time: "1:30 PM",
    duration: "45 min",
    type: "Lab Session",
    instructor: "Prof. Johnson",
    status: "upcoming"
  },
  {
    id: 3,
    subject: "Physics",
    topic: "Quantum Mechanics",
    time: "3:00 PM",
    duration: "60 min",
    type: "Discussion",
    instructor: "Dr. Brown",
    status: "completed"
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
    icon: FileText
  },
  {
    id: 2,
    type: "material",
    title: "Physics Chapter 12 Notes",
    subject: "Physics", 
    dueDate: "Posted 2 hours ago",
    priority: "medium",
    icon: BookOpen
  },
  {
    id: 3,
    type: "announcement",
    title: "Math Quiz Next Week",
    subject: "Mathematics",
    dueDate: "Scheduled for Monday",
    priority: "low",
    icon: Bell
  }
]

export function LatestUpdates() {
  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayClasses.map((classItem) => (
            <div 
              key={classItem.id} 
              className={`
                p-3 rounded-lg border transition-all duration-200 hover:shadow-sm
                ${classItem.status === 'completed' 
                  ? 'bg-muted/50 border-border/50 opacity-70' 
                  : 'bg-background border-border hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={classItem.status === 'completed' ? 'secondary' : 'default'}>
                    {classItem.type}
                  </Badge>
                  <span className="text-sm font-medium">{classItem.subject}</span>
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
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Latest LMS Updates */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lmsUpdates.map((update) => (
            <div 
              key={update.id} 
              className="p-3 rounded-lg border bg-background hover:bg-muted/20 transition-all duration-200 cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg flex-shrink-0
                  ${update.priority === 'high' 
                    ? 'bg-destructive/10 text-destructive' 
                    : update.priority === 'medium' 
                    ? 'bg-amber-500/10 text-amber-600' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <update.icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{update.title}</p>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {update.subject}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{update.dueDate}</p>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-3" size="sm">
            View All Updates
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
