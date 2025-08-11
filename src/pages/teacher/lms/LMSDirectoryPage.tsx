
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight, ChevronDown, Folder, FolderOpen, PlayCircle, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockLMSSeries } from '@/data/mockLMSSeries'
import { LMSSeries } from '@/types/lmsSeries'

interface TreeNode {
  id: string
  name: string
  type: 'chapter' | 'topic' | 'series'
  children?: TreeNode[]
  seriesCount?: number
  series?: LMSSeries
}

export default function LMSDirectoryPage() {
  const navigate = useNavigate()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [selectedInstitute, setSelectedInstitute] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')

  // Get unique filter options
  const institutes = [...new Set(mockLMSSeries.map(s => s.institute))]
  const subjects = selectedInstitute 
    ? [...new Set(mockLMSSeries.filter(s => s.institute === selectedInstitute).map(s => s.subject))]
    : [...new Set(mockLMSSeries.map(s => s.subject))]

  // Build tree data based on filters
  const treeData = useMemo(() => {
    let filteredSeries = mockLMSSeries
    
    if (selectedInstitute) {
      filteredSeries = filteredSeries.filter(s => s.institute === selectedInstitute)
    }
    if (selectedSubject) {
      filteredSeries = filteredSeries.filter(s => s.subject === selectedSubject)
    }

    const chapters = new Map<string, TreeNode>()
    
    filteredSeries.forEach(series => {
      // Create chapter if not exists
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
      const seriesNode: TreeNode = {
        id: `series-${series.id}`,
        name: series.title,
        type: 'series',
        series: series
      }
      topic.children?.push(seriesNode)
    })
    
    return Array.from(chapters.values())
  }, [selectedInstitute, selectedSubject])

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

  const expandAll = () => {
    const allNodeIds = new Set<string>()
    const collectNodeIds = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allNodeIds.add(node.id)
          collectNodeIds(node.children)
        }
      })
    }
    collectNodeIds(treeData)
    setExpandedNodes(allNodeIds)
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  const renderTreeNode = (node: TreeNode, level = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const paddingLeft = level * 24

    return (
      <div key={node.id}>
        <div 
          className={`
            flex items-center gap-2 p-3 hover:bg-muted/50 transition-colors rounded-md
            ${node.type === 'series' ? 'border-l-2 border-primary/20' : ''}
          `}
          style={{ paddingLeft: `${12 + paddingLeft}px` }}
        >
          {hasChildren ? (
            <button
              onClick={() => handleToggle(node.id)}
              className="flex items-center justify-center w-5 h-5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-500" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-500" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          <div className="flex items-center gap-2 min-w-0 flex-1">
            {node.type === 'chapter' && (
              <>
                {hasChildren && isExpanded 
                  ? <FolderOpen className="h-4 w-4 text-amber-500" />
                  : <Folder className="h-4 w-4 text-amber-600" />
                }
                <span className="font-semibold text-foreground">{node.name}</span>
                <span className="text-sm text-muted-foreground">({node.seriesCount})</span>
              </>
            )}
            
            {node.type === 'topic' && (
              <>
                {hasChildren && isExpanded 
                  ? <FolderOpen className="h-4 w-4 text-blue-500" />
                  : <Folder className="h-4 w-4 text-blue-600" />
                }
                <span className="font-medium text-foreground">{node.name}</span>
                <span className="text-sm text-muted-foreground">({node.seriesCount})</span>
              </>
            )}
            
            {node.type === 'series' && (
              <>
                <PlayCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-foreground truncate">{node.name}</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {node.series?.type.replace('-', ' ')}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/teacher/lms/series/${node.series?.id}/preview`)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="space-y-1">
            {node.children?.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">LMS Directory</h1>
          <p className="text-muted-foreground">Browse learning content series by hierarchy</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Institute</label>
              <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Institute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Institutes</SelectItem>
                  {institutes.map(institute => (
                    <SelectItem key={institute} value={institute}>{institute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {treeData.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
              <p className="text-muted-foreground">No series match your current filters.</p>
            </div>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {treeData.map((node) => renderTreeNode(node))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
