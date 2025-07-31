
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Search, Filter, X, RotateCcw } from 'lucide-react'
import type { QuestionFilters } from '@/pages/teacher/exams/UpdateQuestionsPage'

interface QuestionFiltersPanelProps {
  filters: QuestionFilters
  onFiltersChange: (filters: QuestionFilters) => void
  onClearFilters: () => void
  questionCount: number
}

export const QuestionFiltersPanel: React.FC<QuestionFiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  questionCount
}) => {
  const updateFilter = (key: keyof QuestionFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== '').length

  const filterOptions = {
    chapters: [
      'Mechanics', 'Thermodynamics', 'Wave Optics', 'Limits and Continuity', 
      'Rotational Motion', 'Galvanic Cells', 'Eigenvalues and Eigenvectors',
      'Projectile Motion', 'Cell Organelles', 'First Order ODEs', 'Molarity and Dilutions',
      'Schrödinger Equation', 'Gene Expression', 'Gauss\'s Law', 'Reaction Rates',
      'Fourier Series', 'Photosynthesis', 'Capacitance', 'Balancing Equations',
      'Triple Integrals', 'Enzyme Kinetics', 'Ampère\'s Law'
    ],
    topics: [
      'Light Properties', 'Advanced Limits', 'Moment of Inertia', 'Cell Components',
      'Trajectory Analysis', 'Mitochondria', 'Linear ODEs', 'Solution Preparation',
      'Infinite Square Well', 'Cellular Locations', 'Conductors', 'Rate Laws',
      'Periodic Functions', 'Light Reactions', 'Energy Storage', 'Reaction Types',
      'Volume Integrals', 'Enzyme Inhibition', 'Solenoids'
    ],
    categories: [
      'Physics Constants', 'Calculus', 'Mechanics', 'Electrochemistry',
      'Linear Algebra', 'Cell Biology', 'Differential Equations', 'Solution Chemistry',
      'Quantum Mechanics', 'Molecular Biology', 'Electromagnetism', 'Chemical Kinetics',
      'Mathematical Analysis', 'Plant Biology', 'Chemical Reactions', 'Multivariable Calculus',
      'Biochemistry'
    ]
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          Found <span className="font-medium text-blue-600">{questionCount}</span> questions
        </div>
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">Search Questions</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search question text..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chapter Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Chapter</Label>
          <Select value={filters.chapter} onValueChange={(value) => updateFilter('chapter', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Chapters</SelectItem>
              {filterOptions.chapters.map(chapter => (
                <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Topic Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Topic</Label>
          <Select value={filters.topic} onValueChange={(value) => updateFilter('topic', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Topics</SelectItem>
              {filterOptions.topics.map(topic => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {filterOptions.categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Difficulty</Label>
          <Select value={filters.difficulty} onValueChange={(value) => updateFilter('difficulty', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Question Type</Label>
          <Select value={filters.questionType} onValueChange={(value) => updateFilter('questionType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="single">Single Choice</SelectItem>
              <SelectItem value="multiple">Multiple Choice</SelectItem>
              <SelectItem value="fillInBlanks">Fill in Blanks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Bank Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Question Bank Type</Label>
          <Select value={filters.questionBankType} onValueChange={(value) => updateFilter('questionBankType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select bank type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Banks</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="boards">Board Exams</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
