
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface StatItem {
  title: string;
  value: string;
  numericValue: number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  description: string;
  iconBg: string;
  iconColor: string;
}

const stats: StatItem[] = [
  {
    title: "Total Students",
    value: "284",
    numericValue: 284,
    change: "+12 this week",
    changeType: "increase",
    icon: Users,
    description: "Across all batches",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Active Classes",
    value: "8",
    numericValue: 8,
    change: "2 live now",
    changeType: "neutral",
    icon: BookOpen,
    description: "Currently running",
    iconBg: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "This Week",
    value: "24",
    numericValue: 24,
    change: "6 pending",
    changeType: "neutral",
    icon: Calendar,
    description: "Classes scheduled",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Avg Performance",
    value: "87%",
    numericValue: 87,
    change: "+5% improvement",
    changeType: "increase",
    icon: TrendingUp,
    description: "Student success rate",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  }
]

function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const incrementTime = duration / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{count}</span>
}

export function ModernTeacherStats() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Performance Overview</h2>
        <p className="text-sm text-muted-foreground">Key metrics and insights</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                
                {stat.changeType === "increase" && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                )}
                {stat.changeType === "neutral" && (
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {stat.title === "Avg Performance" ? (
                    <><AnimatedCounter value={stat.numericValue} />%</>
                  ) : (
                    <AnimatedCounter value={stat.numericValue} />
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {stat.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
