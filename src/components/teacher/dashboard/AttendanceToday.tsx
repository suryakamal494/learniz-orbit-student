
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Users, Eye } from "lucide-react"
import { mockTeacherScheduleClasses } from "@/data/mockTeacherSchedule"
import { format, isToday, parseISO } from "date-fns"

// Mock attendance data based on completed classes
const generateAttendanceData = () => {
  const completedClasses = mockTeacherScheduleClasses.filter(cls => 
    cls.status === 'completed' || (isToday(parseISO(cls.date)) && Math.random() > 0.5)
  )
  
  return completedClasses.map(cls => ({
    id: cls.id,
    classTitle: cls.topic,
    batch: cls.batch,
    class: cls.class,
    date: cls.date,
    time: cls.time,
    totalStudents: Math.floor(Math.random() * 15) + 20, // 20-35 students
    presentStudents: Math.floor(Math.random() * 10) + 25, // 25-35 present
  })).slice(0, 4) // Latest 4 records
}

export function AttendanceToday() {
  const navigate = useNavigate()
  const attendanceData = generateAttendanceData()
  
  const getAttendanceColor = (present: number, total: number) => {
    const percentage = (present / total) * 100
    if (percentage >= 90) return "bg-success-bg text-success border-2 border-success/30"
    if (percentage >= 75) return "bg-warning-bg text-warning border-2 border-warning/30"
    return "bg-error-bg text-error border-2 border-error/30"
  }

  const handleViewAttendance = (classId: string) => {
    navigate(`/teacher/reports/attendance/${classId}`)
  }

  return (
    <Card className="border-2 border-primary/10 shadow-pastel-md backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-primary/5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-pastel-secondary">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-primary">Today's Attendance</CardTitle>
            <p className="text-body-sm text-muted-foreground">Class attendance records</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/reports/attendance')} className="text-primary hover:text-primary-dark hover:bg-primary/10">
          View all
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3 p-6">
        {attendanceData.map((record, index) => (
          <div 
            key={record.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 group animate-fade-in cursor-pointer border-2 border-transparent hover:border-primary/20 bg-white/50"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleViewAttendance(record.id)}
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                {record.classTitle}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {record.batch} • {record.class}
              </p>
              <p className="text-xs text-muted-foreground">
                {record.time} • {format(parseISO(record.date), 'MMM dd')}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-3">
              <Badge 
                variant="secondary" 
                className={getAttendanceColor(record.presentStudents, record.totalStudents)}
              >
                {record.presentStudents}/{record.totalStudents}
              </Badge>
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation()
                handleViewAttendance(record.id)
              }} className="border-primary/30 hover:border-primary/50 text-primary hover:text-primary-dark">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        ))}
        
        {attendanceData.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No attendance records for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
