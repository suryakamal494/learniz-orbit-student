
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Video, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DirectoryNode {
  id: string
  name: string
  type: 'folder' | 'content' | 'video' | 'document' | 'image'
  children?: DirectoryNode[]
  contentCount?: number
}

const sampleDirectory: DirectoryNode[] = [
  {
    id: 'physics',
    name: 'Physics',
    type: 'folder',
    contentCount: 45,
    children: [
      {
        id: 'mechanics',
        name: 'Mechanics',
        type: 'folder',
        contentCount: 15,
        children: [
          { id: 'kinematics', name: 'Kinematics Video Series', type: 'video' },
          { id: 'dynamics', name: 'Dynamics Notes', type: 'document' },
          { id: 'energy', name: 'Energy Conservation Slides', type: 'content' }
        ]
      },
      {
        id: 'thermodynamics',
        name: 'Thermodynamics',
        type: 'folder',
        contentCount: 12,
        children: [
          { id: 'heat-transfer', name: 'Heat Transfer Diagrams', type: 'image' },
          { id: 'gas-laws', name: 'Gas Laws Simulation', type: 'content' }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    type: 'folder',
    contentCount: 38,
    children: [
      {
        id: 'organic',
        name: 'Organic Chemistry',
        type: 'folder',
        contentCount: 20,
        children: [
          { id: 'hydrocarbons', name: 'Hydrocarbon Structures', type: 'document' },
          { id: 'reactions', name: 'Reaction Mechanisms Video', type: 'video' }
        ]
      }
    ]
  }
]

interface DirectoryItemProps {
  node: DirectoryNode
  level: number
  expandedNodes: Set<string>
  onToggle: (nodeId: string) => void
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ node, level, expandedNodes, onToggle }) => {
  const isExpanded = expandedNodes.has(node.id)
  const hasChildren = node.children && node.children.length > 0
  
  const getIcon = () => {
    switch (node.type) {
      case 'folder':
        return hasChildren && isExpanded 
          ? <FolderOpen className="h-4 w-4 text-amber-500" />
          : <Folder className="h-4 w-4 text-amber-600" />
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'image':
        return <Image className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="w-full">
      <div 
        className={`
          flex items-center gap-2 p-2 hover:bg-muted/50 cursor-pointer transition-colors
          border-l-2 border-transparent hover:border-primary/30
        `}
        style={{ paddingLeft: `${12 + level * 24}px` }}
        onClick={() => hasChildren && onToggle(node.id)}
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
          {getIcon()}
          <span className="font-medium text-foreground truncate">
            {node.name}
          </span>
          {node.contentCount !== undefined && (
            <span className="text-sm text-muted-foreground ml-auto">
              ({node.contentCount})
            </span>
          )}
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {node.children?.map((child) => (
            <DirectoryItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LMSDirectoryPage() {
  const navigate = useNavigate()
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Content Directory
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t max-h-96 overflow-y-auto">
            {sampleDirectory.map((subject) => (
              <DirectoryItem
                key={subject.id}
                node={subject}
                level={0}
                expandedNodes={expandedNodes}
                onToggle={handleToggle}
              />
            ))}
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
              <div className="text-lg font-bold">24</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-lg font-bold">156</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </div>
            <div className="text-center">
              <Image className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-lg font-bold">89</div>
              <div className="text-sm text-muted-foreground">Images</div>
            </div>
            <div className="text-center">
              <Folder className="h-6 w-6 mx-auto mb-2 text-amber-500" />
              <div className="text-lg font-bold">12</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
