
import React, { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  RotateCcw, 
  MoreVertical, 
  Edit,
  Video,
  FileText,
  Image,
  Code,
  File,
  Type
} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { 
  mockLMSContent, 
  mockInstitutes, 
  mockSubjects, 
  mockChapters, 
  mockTopics 
} from '@/data/mockLMSContent'
import type { LMSContentFilters, LMSContentType } from '@/types/lmsContent'

const contentTypeOptions = [
  { value: 'text', label: 'Text', icon: Type },
  { value: 'file', label: 'File', icon: File },
  { value: 'pdf', label: 'PDF', icon: FileText },
  { value: 'image', label: 'Image', icon: Image },
  { value: 'video-url', label: 'Video URL', icon: Video },
  { value: 'iframe', label: 'Iframe', icon: Code },
]

const getContentTypeIcon = (type: LMSContentType) => {
  const option = contentTypeOptions.find(opt => opt.value === type)
  return option ? option.icon : File
}

const getContentTypeBadgeColor = (type: LMSContentType) => {
  const colors = {
    'text': 'bg-blue-100 text-blue-800',
    'file': 'bg-gray-100 text-gray-800',
    'pdf': 'bg-red-100 text-red-800',
    'image': 'bg-green-100 text-green-800',
    'video-url': 'bg-purple-100 text-purple-800',
    'iframe': 'bg-orange-100 text-orange-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

export default function LMSContentPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<LMSContentFilters>({})
  const [searchQuery, setSearchQuery] = useState('')

  // Filter dependencies
  const availableSubjects = useMemo(() => {
    if (!filters.institute) return mockSubjects
    return mockSubjects.filter(subject => {
      const institute = mockInstitutes.find(inst => inst.name === filters.institute)
      return institute ? subject.instituteId === institute.id : true
    })
  }, [filters.institute])

  const availableChapters = useMemo(() => {
    if (!filters.subject) return mockChapters
    const subject = availableSubjects.find(sub => sub.name === filters.subject)
    return subject ? mockChapters.filter(chapter => chapter.subjectId === subject.id) : mockChapters
  }, [filters.subject, availableSubjects])

  const availableTopics = useMemo(() => {
    if (!filters.chapter) return mockTopics
    const chapter = availableChapters.find(chap => chap.name === filters.chapter)
    return chapter ? mockTopics.filter(topic => topic.chapterId === chapter.id) : mockTopics
  }, [filters.chapter, availableChapters])

  // Filter content
  const filteredContent = useMemo(() => {
    return mockLMSContent.filter(content => {
      if (filters.institute && content.institute !== filters.institute) return false
      if (filters.contentType && content.type !== filters.contentType) return false
      if (filters.subject && content.subject !== filters.subject) return false
      if (filters.chapter && content.chapter !== filters.chapter) return false
      if (filters.topic && content.topic !== filters.topic) return false
      if (searchQuery && !content.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [filters, searchQuery])

  const handleFilterChange = (key: keyof LMSContentFilters, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value || undefined }
      
      // Clear dependent filters when parent changes
      if (key === 'institute') {
        delete newFilters.subject
        delete newFilters.chapter
        delete newFilters.topic
      } else if (key === 'subject') {
        delete newFilters.chapter
        delete newFilters.topic
      } else if (key === 'chapter') {
        delete newFilters.topic
      }
      
      return newFilters
    })
  }

  const resetFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  const handleSearch = () => {
    // Search is handled automatically through filteredContent
  }

  const handleTitleClick = (contentId: string) => {
    navigate(`/teacher/lms/content/${contentId}/view`)
  }

  const handleEditClick = (contentId: string) => {
    navigate(`/teacher/lms/content/${contentId}/edit`)
  }

  const handleCreateClick = () => {
    navigate('/teacher/lms/content/create')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LMS Content</h1>
            <p className="text-gray-600 mt-1">Manage your learning materials and content</p>
          </div>
          <Button onClick={handleCreateClick} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
              {/* Institute Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Institute</label>
                <Select 
                  value={filters.institute || ''} 
                  onValueChange={(value) => handleFilterChange('institute', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Institute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Institutes</SelectItem>
                    {mockInstitutes.map(institute => (
                      <SelectItem key={institute.id} value={institute.name}>
                        {institute.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Select 
                  value={filters.contentType || ''} 
                  onValueChange={(value) => handleFilterChange('contentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {contentTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select 
                  value={filters.subject || ''} 
                  onValueChange={(value) => handleFilterChange('subject', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {availableSubjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chapter Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Chapter</label>
                <Select 
                  value={filters.chapter || ''} 
                  onValueChange={(value) => handleFilterChange('chapter', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Chapters</SelectItem>
                    {availableChapters.map(chapter => (
                      <SelectItem key={chapter.id} value={chapter.name}>
                        {chapter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Select 
                  value={filters.topic || ''} 
                  onValueChange={(value) => handleFilterChange('topic', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Topics</SelectItem>
                    {availableTopics.map(topic => (
                      <SelectItem key={topic.id} value={topic.name}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search and Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search content by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch} variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button onClick={resetFilters} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content ({filteredContent.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institute</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No content found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContent.map((content) => {
                    const ContentIcon = getContentTypeIcon(content.type)
                    return (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">
                          {content.institute}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleTitleClick(content.id)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-left"
                          >
                            {content.title}
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <ContentIcon className="h-4 w-4" />
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getContentTypeBadgeColor(content.type)}`}
                              >
                                {contentTypeOptions.find(opt => opt.value === content.type)?.label || content.type}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {content.chapter} → {content.topic}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{content.subject}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditClick(content.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
