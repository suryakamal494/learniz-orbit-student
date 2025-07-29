
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Calendar, Users, Bell } from "lucide-react"
import { TodayClassCard } from "./TodayClassCard"

interface TodayClass {
  id: string
  subject: string
  title: string
  time: string
  teacher: string
  type: 'live' | 'lab' | 'discussion'
  status: 'upcoming' | 'ongoing' | 'completed'
  studentsJoined?: number
  totalStudents?: number
}

const todayClasses: TodayClass[] = [
  {
    id: "class-1",
    subject: "Mathematics",
    title: "Advanced Calculus - Integration by Parts",
    time: "09:00 AM",
    teacher: "Dr. Smith",
    type: "live",
    status: "completed",
    studentsJoined: 28,
    totalStudents: 30
  },
  {
    id: "class-2",
    subject: "Physics", 
    title: "Quantum Mechanics Lab - Wave Functions",
    time: "11:00 AM",
    teacher: "Prof. Johnson",
    type: "lab",
    status: "ongoing",
    studentsJoined: 25,
    totalStudents: 30
  },
  {
    id: "class-3",
    subject: "Chemistry",
    title: "Organic Chemistry Discussion - Reaction Mechanisms",
    time: "02:00 PM", 
    teacher: "Dr. Wilson",
    type: "discussion",
    status: "upcoming",
    totalStudents: 30
  },
  {
    id: "class-4",
    subject: "Biology",
    title: "Cell Biology - Mitosis and Meiosis",
    time: "04:00 PM",
    teacher: "Dr. Brown",
    type: "live",
    status: "upcoming",
    totalStudents: 28
  },
  {
    id: "class-5",
    subject: "Mathematics",
    title: "Statistics Lab - Probability Distributions",
    time: "05:30 PM",
    teacher: "Prof. Davis",
    type: "lab",
    status: "upcoming",
    totalStudents: 25
  },
  {
    id: "class-6",
    subject: "Physics",
    title: "Electromagnetism - Maxwell's Equations",
    time: "07:00 PM",
    teacher: "Dr. Anderson",
    type: "live",
    status: "upcoming",
    totalStudents: 30
  },
  {
    id: "class-7",
    subject: "Chemistry",
    title: "Physical Chemistry Lab - Thermodynamics",
    time: "08:30 PM",
    teacher: "Prof. Martinez",
    type: "lab",
    status: "upcoming",
    totalStudents: 26
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
    title: "Lab Report Submitted",
    description: "Your Chemistry lab report has been successfully submitted",
    time: "3 days ago",
    type: "material",
    subject: "Chemistry"
  },
  {
    id: "7",
    title: "New Quiz Available",
    description: "Mathematics Quiz 4 is now open for attempts",
    time: "4 days ago",
    type: "assignment",
    subject: "Mathematics"
  },
  {
    id: "8",
    title: "Assignment Deadline",
    description: "Physics Assignment 2 deadline extended to next week",
    time: "5 days ago",
    type: "announcement",
    subject: "Physics"
  },
  {
    id: "9",
    title: "New Video Lecture",
    description: "Organic Chemistry video lectures now available",
    time: "6 days ago",
    type: "material",
    subject: "Chemistry"
  },
  {
    id: "10",
    title: "Test Results",
    description: "Biology unit test results have been published",
    time: "1 week ago",
    type: "grade",
    subject: "Biology"
  }
]

interface Update {
  id: string
  title: string
  description: string
  time: string
  type: 'assignment' | 'announcement' | 'grade' | 'material'
  subject?: string
}

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
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto custom-scrollbar">
          <div className="space-y-3 pr-2">
            {todayClasses.map((classItem) => (
              <TodayClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Updates */}
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto custom-scrollbar">
          <div className="space-y-3 pr-2">
            {updates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-white hover:bg-card/80 transition-colors cursor-pointer"
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
