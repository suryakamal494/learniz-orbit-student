
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react'
import { mockDirectoryData, getIndentLevel } from '@/utils/directoryUtils'
import { DirectoryNode } from '@/types/directory'

interface DirectoryItemProps {
  node: DirectoryNode
  onToggle: (nodeId: string) => void
  expandedNodes: Set<string>
  searchTerm: string
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ 
  node, 
  onToggle, 
  expandedNodes,
  searchTerm 
}) => {
  const isExpanded = expandedNodes.has(node.id)
  const indentLevel = getIndentLevel(node.type)
  const hasChildren = node.children && node.children.length > 0
  
  const getIcon = () => {
    if (node.type === 'subtopic') {
      return <FileText className="h-4 w-4 text-blue-500" />
    }
    if (hasChildren) {
      return isExpanded 
        ? <FolderOpen className="h-4 w-4 text-amber-500" />
        : <Folder className="h-4 w-4 text-amber-600" />
    }
    return <FileText className="h-4 w-4 text-blue-500" />
  }

  const getExpandIcon = () => {
    if (!hasChildren) return null
    return isExpanded 
      ? <ChevronDown className="h-4 w-4 text-gray-500" />
      : <ChevronRight className="h-4 w-4 text-gray-500" />
  }

  // Filter logic for search
  const matchesSearch = searchTerm === '' || 
    node.name.toLowerCase().includes(searchTerm.toLowerCase())

  const hasMatchingChildren = node.children?.some(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.children?.some(subChild => 
      subChild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subChild.children?.some(subSubChild =>
        subSubChild.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  )

  if (!matchesSearch && !hasMatchingChildren) {
    return null
  }

  return (
    <div className="w-full">
      <div 
        className={`
          flex items-center gap-2 p-3 hover:bg-muted/50 cursor-pointer transition-colors
          border-l-2 border-transparent hover:border-primary/30
        `}
        style={{ paddingLeft: `${12 + indentLevel * 24}px` }}
        onClick={() => hasChildren && onToggle(node.id)}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {getExpandIcon()}
          {getIcon()}
          <span className="font-medium text-foreground truncate">
            {node.name}
          </span>
          <span className="text-sm text-muted-foreground ml-auto">
            ({node.questionCount})
          </span>
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div className="space-y-1">
          {node.children?.map((child) => (
            <DirectoryItem
              key={child.id}
              node={child}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const DirectoryPage: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

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
    const collectNodeIds = (nodes: DirectoryNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allNodeIds.add(node.id)
          collectNodeIds(node.children)
        }
      })
    }
    collectNodeIds(mockDirectoryData.subjects)
    setExpandedNodes(allNodeIds)
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Directory</h1>
          <p className="text-gray-600 mt-1">
            Browse questions by subject, chapter, topic, and sub-topic hierarchy
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={collapseAll}>
            Collapse All
          </Button>
          <Button variant="outline" onClick={expandAll}>
            Expand All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Directory Overview
              <span className="text-sm font-normal text-muted-foreground">
                (Total: {mockDirectoryData.totalQuestions} questions)
              </span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search subjects, chapters, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t">
            {mockDirectoryData.subjects.map((subject) => (
              <DirectoryItem
                key={subject.id}
                node={subject}
                onToggle={handleToggle}
                expandedNodes={expandedNodes}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DirectoryPage
