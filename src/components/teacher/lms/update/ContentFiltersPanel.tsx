
import React, { useMemo } from 'react'
import { Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockLMSContent, mockSubjects, mockChapters, mockTopics } from '@/data/mockLMSContent'
import { LMSSeries } from '@/types/lmsSeries'
import { ContentFilters } from '@/pages/teacher/lms/UpdateLMSSeriesPage'

interface ContentFiltersPanelProps {
  filters: ContentFilters
  onFilterChange: (key: keyof ContentFilters, value: string) => void
  series: LMSSeries
}

export const ContentFiltersPanel: React.FC<ContentFiltersPanelProps> = ({
  filters,
  onFilterChange,
  series
}) => {
  // Get filter options based on current selections
  const filterOptions = useMemo(() => {
    const subjects = mockSubjects.map(s => s.name)
    
    const chapters = filters.subject 
      ? mockChapters
          .filter(c => {
            const subject = mockSubjects.find(s => s.name === filters.subject)
            return subject && c.subjectId === subject.id
          })
          .map(c => c.name)
      : []
    
    const topics = filters.chapter
      ? mockTopics
          .filter(t => {
            const chapter = mockChapters.find(c => c.name === filters.chapter)
            return chapter && t.chapterId === chapter.id
          })
          .map(t => t.name)
      : []

    const categories = ['Video Content', 'Reading Material', 'Interactive Content', 'Assessment']
    const questionBankTypes = ['MCQ', 'Short Answer', 'Long Answer', 'True/False']

    return { subjects, chapters, topics, categories, questionBankTypes }
  }, [filters.subject, filters.chapter])

  const handleFilterChange = (key: keyof ContentFilters, value: string) => {
    // Convert "all-*" values back to empty strings for internal logic
    const actualValue = value.startsWith('all-') ? '' : value
    onFilterChange(key, actualValue)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Content Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Subject Filter - Mandatory */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <Select
              value={filters.subject}
              onValueChange={(value) => handleFilterChange('subject', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chapter Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Chapter</label>
            <Select
              value={filters.chapter || 'all-chapters'}
              onValueChange={(value) => handleFilterChange('chapter', value)}
              disabled={!filters.subject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-chapters">All Chapters</SelectItem>
                {filterOptions.chapters.map(chapter => (
                  <SelectItem key={chapter} value={chapter}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Topic</label>
            <Select
              value={filters.topic || 'all-topics'}
              onValueChange={(value) => handleFilterChange('topic', value)}
              disabled={!filters.chapter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-topics">All Topics</SelectItem>
                {filterOptions.topics.map(topic => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select
              value={filters.category || 'all-categories'}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {filterOptions.categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Bank Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question Bank Type</label>
            <Select
              value={filters.questionBankType || 'all-types'}
              onValueChange={(value) => handleFilterChange('questionBankType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                {filterOptions.questionBankTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.subject || filters.chapter || filters.topic || filters.category || filters.questionBankType) && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.subject && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Subject: {filters.subject}
                </span>
              )}
              {filters.chapter && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Chapter: {filters.chapter}
                </span>
              )}
              {filters.topic && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  Topic: {filters.topic}
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  Category: {filters.category}
                </span>
              )}
              {filters.questionBankType && (
                <span className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">
                  Type: {filters.questionBankType}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
