
import { Clock, User, Play, BookOpen } from "lucide-react"
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
      return 'bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-800 border-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30 dark:text-blue-300 dark:border-blue-800/60'
    case 'Lab Session':
      return 'bg-gradient-to-r from-green-50 to-green-100/80 text-green-800 border-green-200/60 dark:from-green-950/50 dark:to-green-900/30 dark:text-green-300 dark:border-green-800/60'
    case 'Discussion':
      return 'bg-gradient-to-r from-purple-50 to-purple-100/80 text-purple-800 border-purple-200/60 dark:from-purple-950/50 dark:to-purple-900/30 dark:text-purple-300 dark:border-purple-800/60'
    default:
      return 'bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-800 border-blue-200/60 dark:from-blue-950/50 dark:to-blue-900/30 dark:text-blue-300 dark:border-blue-800/60'
  }
}

const getSubjectGradient = (subject: string) => {
  const gradients = {
    Mathematics: 'from-blue-50 via-blue-100/50 to-blue-50/30 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-blue-950/10',
    Physics: 'from-purple-50 via-purple-100/50 to-purple-50/30 dark:from-purple-950/30 dark:via-purple-900/20 dark:to-purple-950/10',
    Chemistry: 'from-green-50 via-green-100/50 to-green-50/30 dark:from-green-950/30 dark:via-green-900/20 dark:to-green-950/10',
    Biology: 'from-orange-50 via-orange-100/50 to-orange-50/30 dark:from-orange-950/30 dark:via-orange-900/20 dark:to-orange-950/10',
    English: 'from-pink-50 via-pink-100/50 to-pink-50/30 dark:from-pink-950/30 dark:via-pink-900/20 dark:to-pink-950/10',
    History: 'from-indigo-50 via-indigo-100/50 to-indigo-50/30 dark:from-indigo-950/30 dark:via-indigo-900/20 dark:to-indigo-950/10'
  }
  return gradients[subject as keyof typeof gradients] || 'from-blue-50 via-blue-100/50 to-blue-50/30 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-blue-950/10'
}

const getSubjectColor = (subject: string) => {
  const colors = {
    Mathematics: 'text-blue-700 dark:text-blue-300',
    Physics: 'text-purple-700 dark:text-purple-300', 
    Chemistry: 'text-green-700 dark:text-green-300',
    Biology: 'text-orange-700 dark:text-orange-300',
    English: 'text-pink-700 dark:text-pink-300',
    History: 'text-indigo-700 dark:text-indigo-300'
  }
  return colors[subject as keyof typeof colors] || 'text-blue-700 dark:text-blue-300'
}

const getSubjectBorder = (subject: string) => {
  const borders = {
    Mathematics: 'border-blue-200/60 dark:border-blue-800/60',
    Physics: 'border-purple-200/60 dark:border-purple-800/60',
    Chemistry: 'border-green-200/60 dark:border-green-800/60',
    Biology: 'border-orange-200/60 dark:border-orange-800/60',
    English: 'border-pink-200/60 dark:border-pink-800/60',
    History: 'border-indigo-200/60 dark:border-indigo-800/60'
  }
  return borders[subject as keyof typeof borders] || 'border-blue-200/60 dark:border-blue-800/60'
}

export function TodayClassCard({ classItem }: TodayClassCardProps) {
  return (
    <div className={`p-3 sm:p-4 rounded-xl border-2 bg-gradient-to-br ${getSubjectGradient(classItem.subject)} ${getSubjectBorder(classItem.subject)} backdrop-blur-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <Badge 
          variant="secondary" 
          className={`text-xs px-2 sm:px-3 py-1.5 font-medium border ${getTypeColor(classItem.type)} shadow-sm w-fit`}
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {classItem.type}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/60 px-2 py-1 rounded-lg w-fit">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span className="font-medium">{classItem.time}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className={`font-semibold text-base sm:text-lg mb-1 ${getSubjectColor(classItem.subject)} group-hover:text-opacity-80 transition-colors`}>
          {classItem.subject}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {classItem.topic}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/40 px-2 py-1 rounded-md w-fit">
          <User className="h-3 w-3 flex-shrink-0" />
          <span className="font-medium truncate">{classItem.teacher}</span>
        </div>
        
        <Button 
          size="sm" 
          className="h-9 px-3 sm:px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 w-fit"
        >
          <Play className="h-4 w-4 mr-1.5" />
          Join
        </Button>
      </div>
    </div>
  )
}
