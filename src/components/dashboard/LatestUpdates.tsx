import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Bell, FileText, Award, Clock } from "lucide-react"
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
      return <BookOpen className="h-4 w-4" />
    case 'announcement':
      return <Bell className="h-4 w-4" />
    case 'grade':
      return <Award className="h-4 w-4" />
    case 'material':
      return <FileText className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getTypeBackground = (type: string) => {
  switch (type) {
    case 'assignment':
      return 'bg-gradient-to-r from-blue-50 to-blue-100/50 border-l-4 border-blue-400'
    case 'announcement':
      return 'bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-l-4 border-yellow-400'
    case 'grade':
      return 'bg-gradient-to-r from-green-50 to-green-100/50 border-l-4 border-green-400'
    case 'material':
      return 'bg-gradient-to-r from-purple-50 to-purple-100/50 border-l-4 border-purple-400'
    default:
      return 'bg-gradient-to-r from-gray-50 to-gray-100/50 border-l-4 border-gray-400'
  }
}

const getTypeIconColor = (type: string) => {
  switch (type) {
    case 'assignment':
      return 'text-blue-600 bg-blue-100'
    case 'announcement':
      return 'text-yellow-600 bg-yellow-100'
    case 'grade':
      return 'text-green-600 bg-green-100'
    case 'material':
      return 'text-purple-600 bg-purple-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export function LatestUpdates() {
  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <Card className="bg-gradient-to-br from-white via-white to-blue-50/30 border border-blue-100/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent font-bold">
              Today's Classes
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 pr-2">
            <div className="space-y-4">
              {todayClasses.map((classItem) => (
                <TodayClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Latest Updates */}
      <Card className="bg-gradient-to-br from-white via-white to-purple-50/30 border border-purple-100/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-700 to-purple-800 bg-clip-text text-transparent font-bold">
              Latest Updates
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50 pr-2">
            <div className="space-y-3">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02] ${getTypeBackground(update.type)}`}
                >
                  <div className={`flex-shrink-0 p-2 rounded-full ${getTypeIconColor(update.type)} mt-0.5 shadow-sm`}>
                    {getTypeIcon(update.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm truncate text-gray-800">{update.title}</h4>
                      {update.subject && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 bg-white/60 border-gray-300">
                          {update.subject}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2 leading-relaxed">
                      {update.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-600 bg-white/40 px-2 py-1 rounded-md w-fit">
                      <Clock className="h-3 w-3" />
                      <span>{update.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
