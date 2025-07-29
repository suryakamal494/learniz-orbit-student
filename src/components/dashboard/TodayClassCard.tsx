
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
      return 'bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-800 border-blue-200/60'
    case 'Lab Session':
      return 'bg-gradient-to-r from-green-50 to-green-100/80 text-green-800 border-green-200/60'
    case 'Discussion':
      return 'bg-gradient-to-r from-purple-50 to-purple-100/80 text-purple-800 border-purple-200/60'
    default:
      return 'bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-800 border-blue-200/60'
  }
}

const getSubjectGradient = (subject: string) => {
  const gradients = {
    Mathematics: 'from-blue-50 via-blue-100/50 to-blue-50/30',
    Physics: 'from-purple-50 via-purple-100/50 to-purple-50/30',
    Chemistry: 'from-green-50 via-green-100/50 to-green-50/30',
    Biology: 'from-orange-50 via-orange-100/50 to-orange-50/30',
    English: 'from-pink-50 via-pink-100/50 to-pink-50/30',
    History: 'from-indigo-50 via-indigo-100/50 to-indigo-50/30'
  }
  return gradients[subject as keyof typeof gradients] || 'from-blue-50 via-blue-100/50 to-blue-50/30'
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

const getSubjectBorder = (subject: string) => {
  const borders = {
    Mathematics: 'border-blue-200/60',
    Physics: 'border-purple-200/60',
    Chemistry: 'border-green-200/60',
    Biology: 'border-orange-200/60',
    English: 'border-pink-200/60',
    History: 'border-indigo-200/60'
  }
  return borders[subject as keyof typeof borders] || 'border-blue-200/60'
}

export function TodayClassCard({ classItem }: TodayClassCardProps) {
  return (
    <div className={`p-4 rounded-xl border-2 bg-gradient-to-br ${getSubjectGradient(classItem.subject)} ${getSubjectBorder(classItem.subject)} backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant="secondary" 
          className={`text-xs px-3 py-1.5 font-medium border ${getTypeColor(classItem.type)} shadow-sm`}
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {classItem.type}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/60 px-2 py-1 rounded-lg">
          <Clock className="h-3 w-3" />
          <span className="font-medium">{classItem.time}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className={`font-bold text-lg mb-1 ${getSubjectColor(classItem.subject)} group-hover:text-opacity-80 transition-colors`}>
          {classItem.subject}
        </h4>
        <p className="text-sm text-gray-700/80 line-clamp-2 leading-relaxed">
          {classItem.topic}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/40 px-2 py-1 rounded-md">
          <User className="h-3 w-3" />
          <span className="font-medium">{classItem.teacher}</span>
        </div>
        
        <Button 
          size="sm" 
          className="h-8 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-105"
        >
          <Play className="h-3 w-3 mr-1.5" />
          Join
        </Button>
      </div>
    </div>
  )
}
