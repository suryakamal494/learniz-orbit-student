
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Bell } from "lucide-react"
import { TodayClassCard } from "./TodayClassCard"

interface TodayClass {
  id: string
  subject: string
  time: string
  teacher: string
  status: 'upcoming' | 'ongoing' | 'completed'
  studentsJoined?: number
  totalStudents?: number
  topic: string
  type: 'Live Class' | 'Lab Session' | 'Discussion'
}

interface Update {
  id: string
  title: string
  description: string
  time: string
  type: 'assignment' | 'announcement' | 'grade' | 'material'
  subject?: string
}

const todayClasses: TodayClass[] = [
  {
    id: "class-1",
    subject: "Mathematics",
    time: "10:00 AM",
    teacher: "Dr. Smith",
    status: "upcoming",
    topic: "Differential Equations",
    type: "Live Class",
    totalStudents: 30
  },
  {
    id: "class-2",
    subject: "Chemistry", 
    time: "1:30 PM",
    teacher: "Prof. Johnson",
    status: "upcoming",
    topic: "Organic Reactions",
    type: "Lab Session",
    totalStudents: 30
  },
  {
    id: "class-3",
    subject: "Physics",
    time: "3:00 PM", 
    teacher: "Dr. Brown",
    status: "upcoming",
    topic: "Quantum Mechanics",
    type: "Discussion",
    totalStudents: 30
  },
  {
    id: "class-4",
    subject: "Biology",
    time: "4:30 PM", 
    teacher: "Dr. Wilson",
    status: "upcoming",
    topic: "Cell Biology",
    type: "Live Class",
    totalStudents: 30
  },
  {
    id: "class-5",
    subject: "English",
    time: "6:00 PM", 
    teacher: "Ms. Davis",
    status: "upcoming",
    topic: "Literature Analysis",
    type: "Discussion",
    totalStudents: 30
  }
]

const updates: Update[] = [
  {
    id: "1",
    title: "New Assignment Posted",
    description: "Calculus Problem Set 3 is now available",
    time: "2 hours ago",
    type: "assignment",
    subject: "Mathematics"
  },
  {
    id: "2", 
    title: "Grade Published",
    description: "Your Physics Quiz 2 results are ready",
    time: "4 hours ago",
    type: "grade",
    subject: "Physics"
  },
  {
    id: "3",
    title: "Class Announcement",
    description: "Tomorrow's Chemistry lab has been moved to Room 204",
    time: "6 hours ago",
    type: "announcement",
    subject: "Chemistry"
  },
  {
    id: "4",
    title: "New Study Material",
    description: "Advanced Biology notes uploaded for Chapter 5",
    time: "1 day ago",
    type: "material",
    subject: "Biology"
  },
  {
    id: "5",
    title: "Exam Schedule",
    description: "Mid-term examination dates have been announced",
    time: "2 days ago", 
    type: "announcement"
  },
  {
    id: "6",
    title: "Assignment Reminder",
    description: "Chemistry lab report due tomorrow",
    time: "3 hours ago",
    type: "assignment",
    subject: "Chemistry"
  },
  {
    id: "7",
    title: "New Material",
    description: "Physics simulation videos are now available",
    time: "5 hours ago",
    type: "material",
    subject: "Physics"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'assignment':
      return <BookOpen className="h-3 w-3" />
    case 'announcement':
      return <Bell className="h-3 w-3" />
    case 'grade':
      return <Calendar className="h-3 w-3" />
    case 'material':
      return <BookOpen className="h-3 w-3" />
    default:
      return <Bell className="h-3 w-3" />
  }
}

export function LatestUpdates() {
  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-3 pr-2">
            {todayClasses.map((classItem) => (
              <TodayClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Updates */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-3 pr-2">
            {updates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0 p-1.5 rounded-full bg-primary/10 text-primary mt-0.5">
                  {getTypeIcon(update.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{update.title}</h4>
                    {update.subject && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                        {update.subject}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {update.description}
                  </p>
                  <span className="text-xs text-muted-foreground">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
