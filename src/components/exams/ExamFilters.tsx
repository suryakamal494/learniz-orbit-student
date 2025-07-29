
import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from 'lucide-react'

interface ExamFiltersProps {
  filters: {
    search: string
    status: string
    difficulty: string
  }
  onFiltersChange: (filters: any) => void
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
}

export const ExamFilters: React.FC<ExamFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  subjectColor 
}) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <Card className={`${subjectColor.bg} ${subjectColor.border} border`}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search exams..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10 bg-background/50 border-border/40"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <Select
              value={filters.status}
              onValueChange={(value) => updateFilter('status', value)}
            >
              <SelectTrigger className="bg-background/50 border-border/40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div className="w-full sm:w-48">
            <Select
              value={filters.difficulty}
              onValueChange={(value) => updateFilter('difficulty', value)}
            >
              <SelectTrigger className="bg-background/50 border-border/40">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
