
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
  Bell,
  Video,
  CheckCircle2
} from "lucide-react"

interface ClassItem {
  id: number
  subject: string
  topic: string
  time: string
  duration: string
  type: string
  instructor: string
  status: 'upcoming' | 'completed' | 'live'
  color: string
}

interface LMSUpdate {
  id: number
  type: 'assignment' | 'material' | 'announcement' | 'quiz' | 'video'
  title: string
  subject: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  color: string
}

interface LatestUpdatesProps {
  todayClasses?: ClassItem[]
  lmsUpdates?: LMSUpdate[]
  isLoading?: boolean
}

const defaultTodayClasses: ClassItem[] = [
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

const defaultLMSUpdates: LMSUpdate[] = [
  {
    id: 1,
    type: "assignment",
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "Due Tomorrow",
    priority: "high",
    color: "green"
  },
  {
    id: 2,
    type: "material",
    title: "Physics Chapter 12 Notes",
    subject: "Physics", 
    dueDate: "Posted 2 hours ago",
    priority: "medium",
    color: "purple"
  },
  {
    id: 3,
    type: "announcement",
    title: "Math Quiz Next Week",
    subject: "Mathematics",
    dueDate: "Scheduled for Monday",
    priority: "low",
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
    case "orange":
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        badge: "bg-orange-100 text-orange-800"
      }
    case "red":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100 text-red-800"
      }
    case "indigo":
      return {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-700",
        badge: "bg-indigo-100 text-indigo-800"
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

const getUpdateIcon = (type: string) => {
  switch (type) {
    case "assignment": return FileText
    case "material": return BookOpen
    case "announcement": return Bell
    case "quiz": return CheckCircle2
    case "video": return Video
    default: return BookOpen
  }
}

export function LatestUpdates({ 
  todayClasses = defaultTodayClasses, 
  lmsUpdates = defaultLMSUpdates, 
  isLoading = false 
}: LatestUpdatesProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-4 rounded-lg border-2 bg-gray-50 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg border bg-background animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Classes
            </div>
            {todayClasses.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {todayClasses.length} class{todayClasses.length !== 1 ? 'es' : ''}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayClasses.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No classes scheduled for today</p>
            </div>
          ) : (
            <>
              {todayClasses.slice(0, 5).map((classItem) => {
                const colorClasses = getSubjectColorClasses(classItem.color)
                return (
                  <div 
                    key={classItem.id}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md
                      ${classItem.status === 'completed' 
                        ? 'bg-muted/50 border-border/50 opacity-70' 
                        : classItem.status === 'live'
                        ? 'bg-green-50 border-green-200 ring-2 ring-green-100'
                        : `${colorClasses.bg} ${colorClasses.border} hover:border-primary/40`
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={classItem.status === 'completed' ? 'secondary' : classItem.status === 'live' ? 'default' : 'default'} 
                          className={classItem.status === 'live' ? 'bg-green-100 text-green-800' : colorClasses.badge}
                        >
                          {classItem.status === 'live' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />}
                          {classItem.type}
                        </Badge>
                        <span className={`text-sm font-medium ${colorClasses.text} truncate`}>{classItem.subject}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                        <Clock className="h-3 w-3" />
                        {classItem.time}
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-2 line-clamp-1">{classItem.topic}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span className="truncate">{classItem.instructor}</span>
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
                      {classItem.status === 'live' && (
                        <Button 
                          size="sm" 
                          className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Join Live
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
              {todayClasses.length > 5 && (
                <Button variant="outline" className="w-full mt-3 hover:bg-primary/5 hover:border-primary/40 transition-colors" size="sm">
                  View {todayClasses.length - 5} More Classes
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Latest LMS Updates */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Latest Updates
            </div>
            {lmsUpdates.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {lmsUpdates.length} update{lmsUpdates.length !== 1 ? 's' : ''}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lmsUpdates.length === 0 ? (
            <div className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No recent updates</p>
            </div>
          ) : (
            <>
              {lmsUpdates.slice(0, 6).map((update) => {
                const colorClasses = getSubjectColorClasses(update.color)
                const IconComponent = getUpdateIcon(update.type)
                
                return (
                  <div 
                    key={update.id} 
                    className="p-3 rounded-lg border bg-background hover:bg-muted/20 transition-all duration-200 cursor-pointer hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        p-2 rounded-lg flex-shrink-0 ${colorClasses.bg} ${colorClasses.border} border
                      `}>
                        <IconComponent className={`h-4 w-4 ${colorClasses.text}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">{update.title}</p>
                          <Badge variant="outline" className={`text-xs shrink-0 ${colorClasses.badge}`}>
                            {update.subject}
                          </Badge>
                          {update.priority === 'high' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{update.dueDate}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {lmsUpdates.length > 6 && (
                <Button variant="outline" className="w-full mt-3 hover:bg-primary/5 hover:border-primary/40 transition-colors" size="sm">
                  View {lmsUpdates.length - 6} More Updates
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
