
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Video, Image, Eye, ExpandIcon, ShrinkIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockLMSSeries } from '@/data/mockLMSSeries'
import { mockInstitutes } from '@/data/mockLMSContent'

interface DirectoryNode {
  id: string
  name: string
  type: 'institute' | 'subject' | 'chapter' | 'topic' | 'series'
  children?: DirectoryNode[]
  seriesCount?: number
  seriesType?: string
  seriesId?: string
}

export default function LMSDirectoryPage() {
  const navigate = useNavigate()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInstitute, setSelectedInstitute] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  
  // Build tree structure from series data
  const treeData = useMemo(() => {
    let filteredSeries = mockLMSSeries
    
    // Apply filters
    if (selectedInstitute !== 'all') {
      filteredSeries = filteredSeries.filter(series => series.institute === selectedInstitute)
    }
    if (selectedSubject !== 'all') {
      filteredSeries = filteredSeries.filter(series => series.subject === selectedSubject)
    }
    if (searchTerm) {
      filteredSeries = filteredSeries.filter(series => 
        series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        series.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        series.topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    const chapters = new Map<string, DirectoryNode>()
    
    filteredSeries.forEach(series => {
      // Create chapter if it doesn't exist
      if (!chapters.has(series.chapter)) {
        chapters.set(series.chapter, {
          id: `chapter-${series.chapter}`,
          name: series.chapter,
          type: 'chapter',
          children: [],
          seriesCount: 0
        })
      }
      
      const chapter = chapters.get(series.chapter)!
      chapter.seriesCount = (chapter.seriesCount || 0) + 1
      
      // Find or create topic
      let topic = chapter.children?.find(t => t.name === series.topic)
      if (!topic) {
        topic = {
          id: `topic-${series.chapter}-${series.topic}`,
          name: series.topic,
          type: 'topic',
          children: [],
          seriesCount: 0
        }
        chapter.children?.push(topic)
      }
      topic.seriesCount = (topic.seriesCount || 0) + 1
      
      // Add series
      const seriesNode: DirectoryNode = {
        id: `series-${series.id}`,
        name: series.title,
        type: 'series',
        seriesType: series.type,
        seriesId: series.id
      }
      topic.children?.push(seriesNode)
    })
    
    return Array.from(chapters.values())
  }, [mockLMSSeries, selectedInstitute, selectedSubject, searchTerm])

  // Get unique subjects for the current institute
  const availableSubjects = useMemo(() => {
    let series = mockLMSSeries
    if (selectedInstitute !== 'all') {
      series = series.filter(s => s.institute === selectedInstitute)
    }
    return [...new Set(series.map(s => s.subject))]
  }, [selectedInstitute])

  const handleToggle = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleExpandAll = () => {
    const allNodeIds = new Set<string>()
    const addNodeIds = (nodes: DirectoryNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allNodeIds.add(node.id)
          addNodeIds(node.children)
        }
      })
    }
    addNodeIds(treeData)
    setExpandedNodes(allNodeIds)
  }

  const handleCollapseAll = () => {
    setExpandedNodes(new Set())
  }

  const getSeriesIcon = (type?: string) => {
    switch (type) {
      case 'video-series': return <Video className="h-4 w-4 text-red-500" />
      case 'content-series': return <FileText className="h-4 w-4 text-blue-500" />
      case 'assignment-series': return <FileText className="h-4 w-4 text-green-500" />
      case 'quiz-series': return <FileText className="h-4 w-4 text-purple-500" />
      case 'exam-series': return <FileText className="h-4 w-4 text-orange-500" />
      default: return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const renderDirectoryItem = (node: DirectoryNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const paddingLeft = level * 24

    return (
      <div key={node.id} className="w-full">
        <div 
          className="flex items-center gap-2 p-2 hover:bg-muted/50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary/30"
          style={{ paddingLeft: `${12 + paddingLeft}px` }}
          onClick={() => hasChildren && handleToggle(node.id)}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded 
                ? <ChevronDown className="h-3 w-3 text-gray-500" />
                : <ChevronRight className="h-3 w-3 text-gray-500" />
              }
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {node.type === 'series' ? (
              <>
                {getSeriesIcon(node.seriesType)}
                <span className="font-medium text-foreground truncate">{node.name}</span>
                <div className="ml-auto">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/teacher/lms/series/${node.seriesId}/preview`)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {node.type === 'chapter' ? (
                  <FolderOpen className="h-4 w-4 text-amber-500" />
                ) : (
                  <Folder className="h-4 w-4 text-amber-600" />
                )}
                <span className="font-medium text-foreground truncate">{node.name}</span>
                {node.seriesCount !== undefined && (
                  <span className="text-sm text-muted-foreground ml-auto">
                    ({node.seriesCount})
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children?.map((child) => renderDirectoryItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">LMS Directory</h1>
          <p className="text-muted-foreground">Browse learning content by subject hierarchy</p>
        </div>
        <Button onClick={() => navigate('/teacher/lms')}>
          Back to LMS
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
              <SelectTrigger>
                <SelectValue placeholder="Select Institute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutes</SelectItem>
                {mockInstitutes.map(institute => (
                  <SelectItem key={institute.id} value={institute.name}>
                    {institute.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {availableSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Directory Tree */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Series Directory
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExpandAll}>
                <ExpandIcon className="h-4 w-4 mr-2" />
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={handleCollapseAll}>
                <ShrinkIcon className="h-4 w-4 mr-2" />
                Collapse All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t max-h-96 overflow-y-auto">
            {treeData.length > 0 ? (
              treeData.map((chapter) => renderDirectoryItem(chapter))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No series found</h3>
                <p className="text-muted-foreground">No series match your current filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Content Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Video className="h-6 w-6 mx-auto mb-2 text-red-500" />
              <div className="text-lg font-bold">
                {mockLMSSeries.filter(s => s.type === 'video-series').length}
              </div>
              <div className="text-sm text-muted-foreground">Video Series</div>
            </div>
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-lg font-bold">
                {mockLMSSeries.filter(s => s.type === 'content-series').length}
              </div>
              <div className="text-sm text-muted-foreground">Content Series</div>
            </div>
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-lg font-bold">
                {mockLMSSeries.filter(s => s.type === 'assignment-series').length}
              </div>
              <div className="text-sm text-muted-foreground">Assignment Series</div>
            </div>
            <div className="text-center">
              <Folder className="h-6 w-6 mx-auto mb-2 text-amber-500" />
              <div className="text-lg font-bold">{treeData.length}</div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
