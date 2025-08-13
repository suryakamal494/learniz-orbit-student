
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Play, ExternalLink } from "lucide-react"
import { mockTeacherScheduleClasses } from "@/data/mockTeacherSchedule"
import { format, isToday, parseISO } from "date-fns"

export function TodaysClasses() {
  const navigate = useNavigate()
  
  // Filter for today's classes or next upcoming classes
  const todayClasses = mockTeacherScheduleClasses.filter(cls => 
    isToday(parseISO(cls.date))
  )
  
  // If no classes today, get next 3 upcoming classes
  const displayClasses = todayClasses.length > 0 
    ? todayClasses 
    : mockTeacherScheduleClasses
        .filter(cls => new Date(cls.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3)

  const handleStreamingClick = (classItem: any) => {
    if (classItem.assignments.urlView) {
      window.open(classItem.assignments.urlView, '_blank')
    } else {
      navigate(`/teacher/schedule/assign/${classItem.id}`)
    }
  }

  const handleAssignClick = (classId: string) => {
    navigate(`/teacher/schedule/assign/${classId}`)
  }

  const getAssignmentStatus = (assigned: boolean) => {
    return assigned ? (
      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
        Assigned
      </Badge>
    ) : (
      <button 
        className="text-destructive hover:text-destructive/80 text-sm font-medium underline-offset-4 hover:underline"
        onClick={() => handleAssignClick('1')}
      >
        Assign
      </button>
    )
  }

  return (
    <Card className="border-border/50 shadow-premium backdrop-blur-sm bg-card/95">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">
            {todayClasses.length > 0 ? "Today's Classes" : "Upcoming Classes"}
          </CardTitle>
          <p className="text-body-sm text-muted-foreground mt-1">
            {displayClasses.length} classes scheduled
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/schedule')}>
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Streaming</TableHead>
                <TableHead>LMS</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Live Quiz</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.time}</TableCell>
                  <TableCell>{classItem.batch}</TableCell>
                  <TableCell>{classItem.class}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{classItem.topic}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleStreamingClick(classItem)}
                      className="bg-success hover:bg-success/90 text-white"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      START
                    </Button>
                  </TableCell>
                  <TableCell>
                    {getAssignmentStatus(classItem.assignments.lmsAssigned)}
                  </TableCell>
                  <TableCell>
                    {getAssignmentStatus(classItem.assignments.notesAssigned)}
                  </TableCell>
                  <TableCell>
                    {getAssignmentStatus(classItem.assignments.liveQuizAssigned)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {displayClasses.map((classItem, index) => (
            <Card key={classItem.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{classItem.batch}</h4>
                    <p className="text-sm text-muted-foreground">{classItem.class} • {classItem.time}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleStreamingClick(classItem)}
                    className="bg-success hover:bg-success/90 text-white"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    START
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{classItem.topic}</p>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">LMS</p>
                    {getAssignmentStatus(classItem.assignments.lmsAssigned)}
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Notes</p>
                    {getAssignmentStatus(classItem.assignments.notesAssigned)}
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Quiz</p>
                    {getAssignmentStatus(classItem.assignments.liveQuizAssigned)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayClasses.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No classes scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
