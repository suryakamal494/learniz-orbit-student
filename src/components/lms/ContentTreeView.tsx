
import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText, Video, Image, File } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { LMSContentItem } from '@/types/lmsContent'

interface TreeNode {
  id: string
  name: string
  type: 'institute' | 'subject' | 'chapter' | 'topic' | 'content'
  children: TreeNode[]
  content?: LMSContentItem
  count?: number
}

interface ContentTreeViewProps {
  data: LMSContentItem[]
  onContentSelect?: (content: LMSContentItem) => void
}

export const ContentTreeView: React.FC<ContentTreeViewProps> = ({ data, onContentSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const buildTree = (items: LMSContentItem[]): TreeNode[] => {
    const tree: { [key: string]: TreeNode } = {}

    items.forEach(item => {
      // Create institute node
      if (!tree[item.institute]) {
        tree[item.institute] = {
          id: item.institute,
          name: item.institute,
          type: 'institute',
          children: [],
          count: 0
        }
      }

      // Find or create subject node
      let subjectNode = tree[item.institute].children.find(child => child.name === item.subject)
      if (!subjectNode) {
        subjectNode = {
          id: `${item.institute}-${item.subject}`,
          name: item.subject,
          type: 'subject',
          children: [],
          count: 0
        }
        tree[item.institute].children.push(subjectNode)
      }

      // Find or create chapter node
      let chapterNode = subjectNode.children.find(child => child.name === item.chapter)
      if (!chapterNode) {
        chapterNode = {
          id: `${item.institute}-${item.subject}-${item.chapter}`,
          name: item.chapter,
          type: 'chapter',
          children: [],
          count: 0
        }
        subjectNode.children.push(chapterNode)
      }

      // Find or create topic node
      let topicNode = chapterNode.children.find(child => child.name === item.topic)
      if (!topicNode) {
        topicNode = {
          id: `${item.institute}-${item.subject}-${item.chapter}-${item.topic}`,
          name: item.topic,
          type: 'topic',
          children: [],
          count: 0
        }
        chapterNode.children.push(topicNode)
      }

      // Add content node
      const contentNode: TreeNode = {
        id: item.id,
        name: item.title,
        type: 'content',
        children: [],
        content: item
      }
      topicNode.children.push(contentNode)

      // Update counts
      tree[item.institute].count = (tree[item.institute].count || 0) + 1
      subjectNode.count = (subjectNode.count || 0) + 1
      chapterNode.count = (chapterNode.count || 0) + 1
      topicNode.count = (topicNode.count || 0) + 1
    })

    return Object.values(tree)
  }

  const toggleNode = (nodeId: string) => {
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

  const getIcon = (node: TreeNode, isExpanded: boolean) => {
    const iconClass = "h-4 w-4 flex-shrink-0"
    
    switch (node.type) {
      case 'institute':
      case 'subject':
      case 'chapter':
      case 'topic':
        return isExpanded 
          ? <FolderOpen className={`${iconClass} text-amber-500`} />
          : <Folder className={`${iconClass} text-amber-600`} />
      case 'content':
        const contentType = node.content?.type
        switch (contentType) {
          case 'video-url':
            return <Video className={`${iconClass} text-red-500`} />
          case 'pdf':
            return <FileText className={`${iconClass} text-red-600`} />
          case 'image':
            return <Image className={`${iconClass} text-green-500`} />
          default:
            return <File className={`${iconClass} text-blue-500`} />
        }
      default:
        return <Folder className={`${iconClass} text-gray-500`} />
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      'video-url': 'bg-red-100 text-red-800',
      'pdf': 'bg-red-100 text-red-800',
      'text': 'bg-green-100 text-green-800',
      'image': 'bg-yellow-100 text-yellow-800',
      'file': 'bg-blue-100 text-blue-800',
      'iframe': 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const TreeNodeComponent: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children.length > 0
    const paddingLeft = 16 + level * 24

    return (
      <div>
        <div 
          className="flex items-center gap-2 p-2 hover:bg-muted/50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary/30"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id)
            } else if (node.content && onContentSelect) {
              onContentSelect(node.content)
            }
          }}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded 
                ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
                : <ChevronRight className="h-3 w-3 text-muted-foreground" />
              }
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getIcon(node, isExpanded)}
            <span className="font-medium text-foreground truncate">
              {node.name}
            </span>
            
            {node.count !== undefined && (
              <span className="text-sm text-muted-foreground">
                ({node.count})
              </span>
            )}
            
            {node.content && (
              <Badge className={`text-xs ${getTypeColor(node.content.type)}`}>
                {node.content.type}
              </Badge>
            )}
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const treeData = buildTree(data)

  return (
    <div className="border rounded-lg max-h-96 overflow-y-auto">
      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
        />
      ))}
    </div>
  )
}
