
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'
import type { QuestionBankFilters } from '@/types/questionBank'

interface QuestionFiltersPanelProps {
  filters: QuestionBankFilters
  onFiltersChange: (filters: QuestionBankFilters) => void
  searchTerm: string
  onSearchChange: (search: string) => void
}

export function QuestionFiltersPanel({ 
  filters, 
  onFiltersChange, 
  searchTerm, 
  onSearchChange 
}: QuestionFiltersPanelProps) {
  
  console.log('QuestionFiltersPanel: Component is rendering with filters:', filters)
  
  const updateFilter = (key: keyof QuestionBankFilters, value: string) => {
    console.log('QuestionFiltersPanel: Updating filter', key, 'to', value)
    // Convert "all" back to empty string for internal logic
    const actualValue = value === 'all' ? '' : value
    onFiltersChange({ ...filters, [key]: actualValue })
  }

  const clearFilters = () => {
    console.log('QuestionFiltersPanel: Clearing all filters')
    onFiltersChange({
      questionBankType: '',
      chapter: '',
      topic: '',
      category: '',
      difficulty: 'easy'
    })
    onSearchChange('')
  }

  // Helper function to get display value for selects
  const getSelectValue = (filterValue: string) => {
    return filterValue === '' ? 'all' : filterValue
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Questions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search questions, chapters, topics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Question Bank Type */}
          <div>
            <label className="text-sm font-medium mb-1 block">Question Bank Type</label>
            <Select
              value={getSelectValue(filters.questionBankType)}
              onValueChange={(value) => updateFilter('questionBankType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="neet">NEET</SelectItem>
                <SelectItem value="jee">JEE</SelectItem>
                <SelectItem value="boards">Board Exams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chapter */}
          <div>
            <label className="text-sm font-medium mb-1 block">Chapter</label>
            <Select
              value={getSelectValue(filters.chapter)}
              onValueChange={(value) => updateFilter('chapter', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chapters</SelectItem>
                <SelectItem value="Wave Optics">Wave Optics</SelectItem>
                <SelectItem value="Limits and Continuity">Limits and Continuity</SelectItem>
                <SelectItem value="Rotational Motion">Rotational Motion</SelectItem>
                <SelectItem value="Galvanic Cells">Galvanic Cells</SelectItem>
                <SelectItem value="Eigenvalues and Eigenvectors">Eigenvalues and Eigenvectors</SelectItem>
                <SelectItem value="Projectile Motion">Projectile Motion</SelectItem>
                <SelectItem value="Cell Organelles">Cell Organelles</SelectItem>
                <SelectItem value="First Order ODEs">First Order ODEs</SelectItem>
                <SelectItem value="Molarity and Dilutions">Molarity and Dilutions</SelectItem>
                <SelectItem value="Schrödinger Equation">Schrödinger Equation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Topic */}
          <div>
            <label className="text-sm font-medium mb-1 block">Topic</label>
            <Select
              value={getSelectValue(filters.topic)}
              onValueChange={(value) => updateFilter('topic', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="Light Properties">Light Properties</SelectItem>
                <SelectItem value="Advanced Limits">Advanced Limits</SelectItem>
                <SelectItem value="Moment of Inertia">Moment of Inertia</SelectItem>
                <SelectItem value="Cell Components">Cell Components</SelectItem>
                <SelectItem value="Matrix Diagonalization">Matrix Diagonalization</SelectItem>
                <SelectItem value="Trajectory Analysis">Trajectory Analysis</SelectItem>
                <SelectItem value="Mitochondria">Mitochondria</SelectItem>
                <SelectItem value="Linear ODEs">Linear ODEs</SelectItem>
                <SelectItem value="Solution Preparation">Solution Preparation</SelectItem>
                <SelectItem value="Infinite Square Well">Infinite Square Well</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select
              value={getSelectValue(filters.category)}
              onValueChange={(value) => updateFilter('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Physics Constants">Physics Constants</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Mechanics">Mechanics</SelectItem>
                <SelectItem value="Electrochemistry">Electrochemistry</SelectItem>
                <SelectItem value="Linear Algebra">Linear Algebra</SelectItem>
                <SelectItem value="Cell Biology">Cell Biology</SelectItem>
                <SelectItem value="Differential Equations">Differential Equations</SelectItem>
                <SelectItem value="Solution Chemistry">Solution Chemistry</SelectItem>
                <SelectItem value="Quantum Mechanics">Quantum Mechanics</SelectItem>
                <SelectItem value="Molecular Biology">Molecular Biology</SelectItem>
                <SelectItem value="Electromagnetism">Electromagnetism</SelectItem>
                <SelectItem value="Chemical Kinetics">Chemical Kinetics</SelectItem>
                <SelectItem value="Mathematical Analysis">Mathematical Analysis</SelectItem>
                <SelectItem value="Plant Biology">Plant Biology</SelectItem>
                <SelectItem value="Chemical Reactions">Chemical Reactions</SelectItem>
                <SelectItem value="Multivariable Calculus">Multivariable Calculus</SelectItem>
                <SelectItem value="Biochemistry">Biochemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium mb-1 block">Difficulty</label>
            <Select
              value={getSelectValue(filters.difficulty)}
              onValueChange={(value) => updateFilter('difficulty', value as 'easy' | 'medium' | 'hard')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Type */}
          <div>
            <label className="text-sm font-medium mb-1 block">Question Type</label>
            <Select
              value="all"
              onValueChange={(value) => {
                // Handle question type filter - this would need to be added to the filters interface
                console.log('Question type filter:', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="single">Single Choice</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="fillInBlanks">Fill in Blanks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
