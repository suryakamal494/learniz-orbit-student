
import { Clock, User, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface TodayClassCardProps {
  classItem: TodayClass
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Live Class':
      return 'bg-blue-500/10 text-blue-700 border-blue-200'
    case 'Lab Session':
      return 'bg-green-500/10 text-green-700 border-green-200'
    case 'Discussion':
      return 'bg-gray-500/10 text-gray-700 border-gray-200'
    default:
      return 'bg-blue-500/10 text-blue-700 border-blue-200'
  }
}

const getSubjectColor = (subject: string) => {
  const colors = {
    Mathematics: 'text-blue-700',
    Physics: 'text-purple-700', 
    Chemistry: 'text-green-700',
    Biology: 'text-orange-700',
    English: 'text-pink-700',
    History: 'text-indigo-700'
  }
  return colors[subject as keyof typeof colors] || 'text-blue-700'
}

export function TodayClassCard({ classItem }: TodayClassCardProps) {
  return (
    <div className="p-4 rounded-xl border bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant="secondary" 
          className={`text-xs px-2 py-1 font-medium ${getTypeColor(classItem.type)}`}
        >
          {classItem.type}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{classItem.time}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <h4 className={`font-semibold text-lg ${getSubjectColor(classItem.subject)}`}>
          {classItem.subject}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-1">
          {classItem.topic}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{classItem.teacher}</span>
        </div>
        
        <Button 
          size="sm" 
          className="h-8 px-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs font-medium"
        >
          <Play className="h-3 w-3 mr-1" />
          Join
        </Button>
      </div>
    </div>
  )
}
