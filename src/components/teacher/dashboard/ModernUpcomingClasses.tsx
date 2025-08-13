
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Play, Calendar, ExternalLink } from "lucide-react"
import { mockUpcomingClasses } from "@/data/mockUpcomingClasses"

export function ModernUpcomingClasses() {
  const navigate = useNavigate()

  const handleStreamingClick = (streamingUrl?: string) => {
    if (streamingUrl) {
      window.open(streamingUrl, '_blank')
    }
  }

  const handleAssignClick = (classId: string, type: 'animations' | 'notes' | 'quiz') => {
    navigate(`/teacher/schedule/assign/${classId}?type=${type}`)
  }

  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Upcoming Classes</CardTitle>
              <p className="text-sm text-muted-foreground">{mockUpcomingClasses.length} classes scheduled</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/schedule')}>
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Time</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Batch</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Class</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Topic</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Streaming Link</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Animations</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Faculty Notes</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Live Quiz</th>
              </tr>
            </thead>
            <tbody>
              {mockUpcomingClasses.slice(0, 6).map((classItem) => (
                <tr key={classItem.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="text-sm font-medium">{classItem.time}</div>
                    <div className="text-xs text-muted-foreground">{classItem.duration}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm font-medium">{classItem.batch}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm font-medium">{classItem.class}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm font-medium max-w-[200px] truncate" title={classItem.title}>
                      {classItem.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{classItem.subject}</div>
                  </td>
                  <td className="py-3 px-2">
                    {classItem.streamingUrl ? (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleStreamingClick(classItem.streamingUrl)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        START
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not available</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleAssignClick(classItem.id, 'animations')}
                      className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Assign
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleAssignClick(classItem.id, 'notes')}
                      className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Assign
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleAssignClick(classItem.id, 'quiz')}
                      className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
