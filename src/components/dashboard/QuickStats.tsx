
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Calendar,
  Users,
  Zap
} from "lucide-react"

interface StatItem {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const stats: StatItem[] = [
  {
    title: "Overall Progress",
    value: "74%",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Study Time",
    value: "28h",
    change: "+3h",
    trend: "up",
    icon: Clock,
    color: "text-blue-600"
  },
  {
    title: "Assignments",
    value: "8/12",
    change: "+2",
    trend: "up",
    icon: Target,
    color: "text-purple-600"
  },
  {
    title: "Achievements",
    value: "15",
    change: "+3",
    trend: "up",
    icon: Award,
    color: "text-yellow-600"
  }
]

export function QuickStats() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Quick Overview</h3>
          <p className="text-sm text-muted-foreground">Your learning progress this week</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Zap className="h-3 w-3 mr-1" />
          Live Updates
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title}
            className="glass border-0 shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  p-3 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                
                <Badge 
                  variant="secondary" 
                  className={`
                    text-xs font-medium
                    ${stat.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : stat.trend === 'down' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}
                >
                  {stat.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
