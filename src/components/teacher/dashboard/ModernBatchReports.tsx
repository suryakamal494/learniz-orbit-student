
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { FileBarChart, Eye, Calendar, Users } from "lucide-react"
import { mockBatchExamReports } from "@/data/mockBatchReports"
import { format, parseISO } from "date-fns"

export function ModernBatchReports() {
  const navigate = useNavigate()
  
  const latestReports = mockBatchExamReports
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const handleViewReport = (examId: string) => {
    navigate(`/teacher/reports/batch/${examId}`)
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50">
              <FileBarChart className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Batch Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Latest exam results</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/reports/batch')}>
            View all
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {latestReports.map((report) => (
          <Card
            key={report.id}
            className="border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => handleViewReport(report.examId)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 space-y-2">
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {report.examTitle}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(report.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{report.totalStudents} students</span>
                    </div>
                    <span className="font-medium">{report.batchName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getPerformanceColor(report.averagePerformance)} transition-all duration-300`}
                        style={{ width: `${report.averagePerformance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">
                      {report.averagePerformance}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Average</div>
                    <div className="text-lg font-bold">
                      {report.averagePerformance}%
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewReport(report.examId)
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {latestReports.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-3">
              <FileBarChart className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">No batch reports available</p>
            <p className="text-xs">Reports will appear here after exams are completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
