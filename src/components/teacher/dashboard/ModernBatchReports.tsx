
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { FileBarChart, Eye, TrendingUp, Users, Calendar } from "lucide-react"
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
    if (percentage >= 85) return "from-green-400 to-emerald-500"
    if (percentage >= 70) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-pink-500"
  }

  const getPerformanceGrade = (percentage: number) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B+"
    if (percentage >= 60) return "B"
    return "C"
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-card to-card/95">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <FileBarChart className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                Batch Reports
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Latest results
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Performance insights</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/reports/batch')}>
            View all
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {latestReports.map((report, index) => (
          <Card
            key={report.id}
            className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleViewReport(report.examId)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {report.examTitle}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${getPerformanceColor(report.averagePerformance)} text-white border-0`}
                    >
                      {getPerformanceGrade(report.averagePerformance)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(report.date), 'MMM dd')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{report.totalStudents} students</span>
                    </div>
                    <span className="font-medium">{report.batchName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getPerformanceColor(report.averagePerformance)} transition-all duration-500`}
                        style={{ width: `${report.averagePerformance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {report.averagePerformance}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className={`text-lg font-bold bg-gradient-to-r ${getPerformanceColor(report.averagePerformance)} bg-clip-text text-transparent`}>
                      {report.averagePerformance}%
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
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
            <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-3">
              <FileBarChart className="h-8 w-8 opacity-50" />
            </div>
            <p className="text-sm font-medium">No batch reports available</p>
            <p className="text-xs">Reports will appear here after exams are completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
