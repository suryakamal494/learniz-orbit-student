
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

const todayAttendance = [
  {
    id: "1",
    className: "Physics - Mechanics",
    batchName: "JEE Advanced 2025",
    time: "09:00 AM",
    totalStudents: 45,
    presentStudents: 42,
    absentStudents: 3,
    attendancePercentage: 93.3
  },
  {
    id: "2",
    className: "Chemistry - Organic",
    batchName: "NEET 2025", 
    time: "11:30 AM",
    totalStudents: 38,
    presentStudents: 35,
    absentStudents: 3,
    attendancePercentage: 92.1
  },
  {
    id: "3",
    className: "Mathematics - Calculus",
    batchName: "Foundation Course",
    time: "02:00 PM",
    totalStudents: 52,
    presentStudents: 47,
    absentStudents: 5,
    attendancePercentage: 90.4
  }
]

export function ModernAttendanceToday() {
  const navigate = useNavigate()

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return "bg-emerald-100 text-emerald-800 border-emerald-200"
    if (percentage >= 90) return "bg-blue-100 text-blue-800 border-blue-200"
    if (percentage >= 80) return "bg-amber-100 text-amber-800 border-amber-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const handleViewAttendance = (classId: string) => {
    navigate(`/teacher/reports/attendance?class=${classId}`)
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-bold text-slate-900">Today's Attendance</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/teacher/reports/attendance')}
            className="hover:bg-primary/5"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {todayAttendance.map((attendance, index) => (
            <Card 
              key={attendance.id}
              className={`border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer group animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleViewAttendance(attendance.id)}
            >
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                        {attendance.className}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{attendance.time}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium">{attendance.batchName}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-primary/5 shrink-0"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">Attendance:</span>
                      <Badge className={`${getAttendanceColor(attendance.attendancePercentage)} font-semibold`}>
                        {attendance.attendancePercentage.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-700 font-medium">Present: {attendance.presentStudents}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-slate-700 font-medium">Absent: {attendance.absentStudents}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
