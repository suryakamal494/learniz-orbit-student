
import React from 'react'
import { Clock, User, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ClassItem {
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

interface TodayClassCardProps {
  classItem: ClassItem
}

const getTypeConfig = (type: string) => {
  switch (type) {
    case 'live':
      return {
        badge: 'Live Class',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        buttonColor: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
      }
    case 'lab':
      return {
        badge: 'Lab Session',
        color: 'bg-green-100 text-green-800 border-green-200',
        buttonColor: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
      }
    case 'discussion':
      return {
        badge: 'Discussion',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        buttonColor: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
      }
    default:
      return {
        badge: 'Class',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        buttonColor: 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary'
      }
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'ongoing':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'upcoming':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function TodayClassCard({ classItem }: TodayClassCardProps) {
  const typeConfig = getTypeConfig(classItem.type)
  
  return (
    <div className="p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200 space-y-3">
      {/* Header with badges */}
      <div className="flex items-center justify-between">
        <Badge className={`${typeConfig.color} text-xs font-medium px-2 py-1`}>
          {typeConfig.badge}
        </Badge>
        <Badge className={`${getStatusColor(classItem.status)} text-xs font-medium px-2 py-1`}>
          {classItem.status}
        </Badge>
      </div>
      
      {/* Subject and Title */}
      <div>
        <h4 className="font-semibold text-foreground text-sm">{classItem.subject}</h4>
        <p className="text-sm text-muted-foreground line-clamp-1">{classItem.title}</p>
      </div>
      
      {/* Teacher and Time */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{classItem.teacher}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{classItem.time}</span>
        </div>
      </div>
      
      {/* Students count and Join button */}
      <div className="flex items-center justify-between">
        {classItem.studentsJoined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Video className="h-3 w-3" />
            <span>{classItem.studentsJoined}/{classItem.totalStudents} joined</span>
          </div>
        )}
        
        <Button 
          className={`${typeConfig.buttonColor} text-white text-xs px-3 py-1 h-7 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200`}
          disabled={classItem.status === 'completed'}
        >
          {classItem.status === 'completed' ? 'Ended' : 'Join'}
        </Button>
      </div>
    </div>
  )
}
