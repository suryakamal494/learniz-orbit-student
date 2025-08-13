
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, TrendingUp, Award, Target } from "lucide-react"
import { useEffect, useState } from "react"

interface StatItem {
  title: string;
  value: string;
  numericValue: number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  gradient: string;
  description: string;
}

const stats: StatItem[] = [
  {
    title: "Total Students",
    value: "284",
    numericValue: 284,
    change: "+12 this week",
    changeType: "increase",
    icon: Users,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    description: "Across all batches"
  },
  {
    title: "Active Classes",
    value: "8",
    numericValue: 8,
    change: "2 live now",
    changeType: "neutral",
    icon: BookOpen,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    description: "Currently running"
  },
  {
    title: "This Week",
    value: "24",
    numericValue: 24,
    change: "6 pending",
    changeType: "neutral",
    icon: Calendar,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    description: "Classes scheduled"
  },
  {
    title: "Avg Performance",
    value: "87%",
    numericValue: 87,
    change: "+5% improvement",
    changeType: "increase",
    icon: TrendingUp,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    description: "Student success rate"
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
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
        <h2 className="text-xl font-bold text-foreground">Performance Overview</h2>
        <Badge variant="secondary" className="ml-auto">Live data</Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-90`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent"></div>
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-500"></div>
            
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="h-7 w-7" />
                </div>
                
                {stat.changeType === "increase" && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                )}
                {stat.changeType === "neutral" && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {stat.change}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-bold group-hover:text-white/90 transition-colors">
                  {stat.title === "Avg Performance" ? (
                    <><AnimatedCounter value={stat.numericValue} />%</>
                  ) : (
                    <AnimatedCounter value={stat.numericValue} />
                  )}
                </h3>
                <p className="text-lg font-semibold text-white/90">
                  {stat.title}
                </p>
                <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors">
                  {stat.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 via-white/50 to-white/30 group-hover:from-white/50 group-hover:to-white/50 transition-all duration-300"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
