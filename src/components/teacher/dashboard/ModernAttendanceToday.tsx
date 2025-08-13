
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Users, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { mockTeacherScheduleClasses } from "@/data/mockTeacherSchedule"
import { format, isToday, parseISO } from "date-fns"

const generateAttendanceData = () => {
  const completedClasses = mockTeacherScheduleClasses.filter(cls => 
    cls.status === 'completed' || (isToday(parseISO(cls.date)) && Math.random() > 0.5)
  )
  
  return completedClasses.map(cls => {
    const totalStudents = Math.floor(Math.random() * 15) + 20
    const presentStudents = Math.floor(Math.random() * 10) + Math.max(totalStudents - 10, 15)
    return {
      id: cls.id,
      classTitle: cls.topic,
      batch: cls.batch,
      class: cls.class,
      date: cls.date,
      time: cls.time,
      totalStudents,
      presentStudents,
    }
  }).slice(0, 4)
}

export function ModernAttendanceToday() {
  const navigate = useNavigate()
  const attendanceData = generateAttendanceData()
  
  const getAttendanceColor = (present: number, total: number) => {
    const percentage = (present / total) * 100
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getAttendanceIcon = (present: number, total: number) => {
    const percentage = (present / total) * 100
    if (percentage >= 90) return CheckCircle
    if (percentage >= 75) return Clock
    return AlertCircle
  }

  const handleViewAttendance = (classId: string) => {
    navigate(`/teacher/reports/attendance/${classId}`)
  }

  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Today's Attendance</CardTitle>
              <p className="text-sm text-muted-foreground">{attendanceData.length} classes completed</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/reports/attendance')}>
            View all
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {attendanceData.map((record) => {
          const AttendanceIcon = getAttendanceIcon(record.presentStudents, record.totalStudents)
          const percentage = Math.round((record.presentStudents / record.totalStudents) * 100)
          
          return (
            <Card
              key={record.id}
              className="border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => handleViewAttendance(record.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <AttendanceIcon className={`h-4 w-4 ${percentage >= 90 ? 'text-green-600' : percentage >= 75 ? 'text-yellow-600' : 'text-red-600'}`} />
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">
                        {record.classTitle}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium">{record.batch}</span>
                      <span>{record.class}</span>
                      <span>{record.time}</span>
                      <span>{format(parseISO(record.date), 'MMM dd')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${getAttendanceColor(record.presentStudents, record.totalStudents)} transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Present</div>
                      <div className="text-lg font-bold">
                        {record.presentStudents}/{record.totalStudents}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewAttendance(record.id)
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {attendanceData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-3">
              <Users className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">No attendance records for today</p>
            <p className="text-xs">Records will appear here after classes are completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
