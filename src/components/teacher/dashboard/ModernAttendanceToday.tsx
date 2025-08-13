
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
    if (percentage >= 90) return "from-green-400 to-emerald-500"
    if (percentage >= 75) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-pink-500"
  }

  const getAttendanceIcon = (present: number, total: number) => {
    const percentage = (present / total) * 100
    if (percentage >= 90) return CheckCircle
    if (percentage >= 75) return Clock
    return AlertCircle
  }

  const getAttendanceStatus = (present: number, total: number) => {
    const percentage = (present / total) * 100
    if (percentage >= 90) return "Excellent"
    if (percentage >= 75) return "Good"
    return "Needs Attention"
  }

  const handleViewAttendance = (classId: string) => {
    navigate(`/teacher/reports/attendance/${classId}`)
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-card to-card/95">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                Today's Attendance
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {attendanceData.length} classes
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Student participation</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/reports/attendance')}>
            View all
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {attendanceData.map((record, index) => {
          const AttendanceIcon = getAttendanceIcon(record.presentStudents, record.totalStudents)
          const percentage = Math.round((record.presentStudents / record.totalStudents) * 100)
          
          return (
            <Card
              key={record.id}
              className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleViewAttendance(record.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardContent className="relative p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <AttendanceIcon className={`h-4 w-4 ${percentage >= 90 ? 'text-green-500' : percentage >= 75 ? 'text-yellow-500' : 'text-red-500'}`} />
                      <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {record.classTitle}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`bg-gradient-to-r ${getAttendanceColor(record.presentStudents, record.totalStudents)} text-white border-0 text-xs`}
                      >
                        {getAttendanceStatus(record.presentStudents, record.totalStudents)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium">{record.batch}</span>
                      <span>{record.class}</span>
                      <span>{record.time}</span>
                      <span>{format(parseISO(record.date), 'MMM dd')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getAttendanceColor(record.presentStudents, record.totalStudents)} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Present</div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${getAttendanceColor(record.presentStudents, record.totalStudents)} bg-clip-text text-transparent`}>
                        {record.presentStudents}/{record.totalStudents}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
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
            <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-3">
              <Users className="h-8 w-8 opacity-50" />
            </div>
            <p className="text-sm font-medium">No attendance records for today</p>
            <p className="text-xs">Records will appear here after classes are completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
