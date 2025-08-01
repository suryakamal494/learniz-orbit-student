
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
import { Label } from "@/components/ui/label"
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  FileText, 
  Video, 
  Image, 
  Code,
  Type,
  File
} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { 
  mockLMSContent, 
  mockInstitutes, 
  mockSubjects, 
  mockChapters, 
  mockTopics 
} from '@/data/mockLMSContent'
import type { LMSContentType } from '@/types/lmsContent'

interface TreeNode {
  id: string
  name: string
  type: 'chapter' | 'topic' | 'content'
  isExpanded: boolean
  children?: TreeNode[]
  contentType?: LMSContentType
  contentId?: string
}

const getContentTypeIcon = (type: LMSContentType) => {
  const icons = {
    'text': Type,
    'file': File,
    'video-url': Video,
    'iframe': Code
  }
  return icons[type] || FileText
}

export default function ContentLibraryPage() {
  const navigate = useNavigate()
  const [selectedInstitute, setSelectedInstitute] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false)

  // Filter available subjects based on selected institute
  const availableSubjects = useMemo(() => {
    if (!selectedInstitute) return mockSubjects
    const institute = mockInstitutes.find(inst => inst.name === selectedInstitute)
    return institute ? mockSubjects.filter(subject => subject.instituteId === institute.id) : mockSubjects
  }, [selectedInstitute])

  const buildTreeData = () => {
    if (!selectedSubject) return []

    const subject = availableSubjects.find(sub => sub.name === selectedSubject)
    if (!subject) return []

    // Get chapters for the selected subject
    const chapters = mockChapters.filter(chapter => chapter.subjectId === subject.id)
    
    return chapters.map(chapter => {
      // Get topics for this chapter
      const topics = mockTopics.filter(topic => topic.chapterId === chapter.id)
      
      const topicNodes: TreeNode[] = topics.map(topic => {
        // Get content for this topic
        const contents = mockLMSContent.filter(content => 
          content.subject === selectedSubject && 
          content.chapter === chapter.name && 
          content.topic === topic.name &&
          (!selectedInstitute || content.institute === selectedInstitute)
        )
        
        const contentNodes: TreeNode[] = contents.map(content => ({
          id: `content-${content.id}`,
          name: content.title,
          type: 'content' as const,
          isExpanded: false,
          contentType: content.type,
          contentId: content.id
        }))
        
        return {
          id: `topic-${topic.id}`,
          name: topic.name,
          type: 'topic' as const,
          isExpanded: false,
          children: contentNodes
        }
      })
      
      return {
        id: `chapter-${chapter.id}`,
        name: chapter.name,
        type: 'chapter' as const,
        isExpanded: false,
        children: topicNodes
      }
    })
  }

  const handleApplyFilters = () => {
    const newTreeData = buildTreeData()
    setTreeData(newTreeData)
    setHasAppliedFilters(true)
  }

  const toggleNode = (nodeId: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }
    
    setTreeData(updateNode(treeData))
  }

  const handlePreview = (contentId: string) => {
    navigate(`/teacher/lms/content/${contentId}/view`)
  }

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const paddingLeft = level * 24

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors`}
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
          onClick={() => hasChildren ? toggleNode(node.id) : undefined}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {node.isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </div>
          )}
          
          {!hasChildren && <div className="w-4" />}
          
          {node.type === 'content' && node.contentType && (
            <div className="w-4 h-4 flex items-center justify-center">
              {React.createElement(getContentTypeIcon(node.contentType), {
                className: "h-4 w-4 text-blue-600"
              })}
            </div>
          )}
          
          <span className={`flex-1 text-sm ${
            node.type === 'chapter' ? 'font-semibold text-gray-900' :
            node.type === 'topic' ? 'font-medium text-gray-700' :
            'text-gray-600'
          }`}>
            {node.name}
          </span>
          
          {node.type === 'content' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                if (node.contentId) {
                  handlePreview(node.contentId)
                }
              }}
              className="h-8 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
          )}
        </div>
        
        {hasChildren && node.isExpanded && node.children && (
          <div className="ml-2">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600 mt-1">Browse and preview all learning materials in a hierarchical view</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Institute</Label>
                <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Institute" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInstitutes.map(institute => (
                      <SelectItem key={institute.id} value={institute.name}>
                        {institute.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject *</Label>
                <Select 
                  value={selectedSubject} 
                  onValueChange={setSelectedSubject}
                  disabled={!selectedInstitute}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleApplyFilters}
                  disabled={!selectedSubject}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Hierarchy</CardTitle>
          </CardHeader>
          <CardContent>
            {!hasAppliedFilters ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select filters and click "Apply Filters" to view the content hierarchy</p>
              </div>
            ) : treeData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No content found for the selected filters</p>
              </div>
            ) : (
              <div className="space-y-1">
                {treeData.map(node => renderTreeNode(node))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
