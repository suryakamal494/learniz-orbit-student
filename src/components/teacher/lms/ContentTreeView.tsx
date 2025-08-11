
import React, { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, FileText, Video, Image, Code, File, Type, Eye, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { LMSContentItem } from '@/types/lmsContent'
import { useNavigate } from 'react-router-dom'

interface ContentTreeViewProps {
  content: LMSContentItem[]
  selectedInstitute?: string
  selectedTeacher?: string
}

interface TreeNode {
  id: string
  name: string
  type: 'chapter' | 'topic' | 'subtopic' | 'content'
  children?: TreeNode[]
  content?: LMSContentItem
  contentCount?: number
}

export const ContentTreeView: React.FC<ContentTreeViewProps> = ({ 
  content, 
  selectedInstitute, 
  selectedTeacher 
}) => {
  const navigate = useNavigate()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  // Build tree structure from flat content data
  const treeData = useMemo(() => {
    const chapters = new Map<string, TreeNode>()
    
    content.forEach(item => {
      // Create chapter node if it doesn't exist
      if (!chapters.has(item.chapter)) {
        chapters.set(item.chapter, {
          id: `chapter-${item.chapter}`,
          name: item.chapter,
          type: 'chapter',
          children: [],
          contentCount: 0
        })
      }
      
      const chapter = chapters.get(item.chapter)!
      chapter.contentCount = (chapter.contentCount || 0) + 1
      
      // Find or create topic
      let topic = chapter.children?.find(t => t.name === item.topic)
      if (!topic) {
        topic = {
          id: `topic-${item.chapter}-${item.topic}`,
          name: item.topic,
          type: 'topic',
          children: [],
          contentCount: 0
        }
        chapter.children?.push(topic)
      }
      topic.contentCount = (topic.contentCount || 0) + 1
      
      // Add content item
      const contentNode: TreeNode = {
        id: `content-${item.id}`,
        name: item.title,
        type: 'content',
        content: item
      }
      topic.children?.push(contentNode)
    })
    
    return Array.from(chapters.values())
  }, [content])

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video-url': return <Video className="h-4 w-4" />
      case 'pdf': return <FileText className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'iframe': return <Code className="h-4 w-4" />
      case 'file': return <File className="h-4 w-4" />
      default: return <Type className="h-4 w-4" />
    }
  }

  const getContentTypeColor = (type: string) => {
    const colors = {
      'video-url': 'bg-purple-100 text-purple-800 border-purple-200',
      'pdf': 'bg-red-100 text-red-800 border-red-200',
      'file': 'bg-blue-100 text-blue-800 border-blue-200',
      'text': 'bg-green-100 text-green-800 border-green-200',
      'image': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'iframe': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const renderTreeNode = (node: TreeNode, level = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const paddingLeft = level * 24

    return (
      <div key={node.id}>
        <div 
          className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleNode(node.id)}
              className="flex items-center justify-center w-5 h-5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : (
            <div className="w-5 h-5" />
          )}

          {node.type === 'content' ? (
            <div className="flex items-center gap-2 flex-1">
              {getContentTypeIcon(node.content!.type)}
              <span className="text-sm font-medium">{node.name}</span>
              <Badge className={`text-xs ${getContentTypeColor(node.content!.type)}`}>
                {node.content!.type.charAt(0).toUpperCase() + node.content!.type.slice(1)}
              </Badge>
              <div className="ml-auto flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/teacher/lms/content/${node.content!.id}/view`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/teacher/lms/content/${node.content!.id}/edit`)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium">{node.name}</span>
              <Badge variant="outline" className="text-xs">
                {node.contentCount} items
              </Badge>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (treeData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
        <p className="text-muted-foreground">No content matches your current filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {treeData.map(node => renderTreeNode(node))}
    </div>
  )
}
