
import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  FileText, 
  Youtube, 
  BookOpen, 
  FileQuestion, 
  Play,
  Eye,
  CheckCircle2,
  Circle
} from "lucide-react"
import type { ContentItem } from '@/types/lms'

interface ContentItemRowProps {
  item: ContentItem
  index: number
  onOpenMedia: (content: ContentItem) => void
}

export const ContentItemRow: React.FC<ContentItemRowProps> = ({
  item,
  index,
  onOpenMedia
}) => {
  const getContentIcon = (type: string) => {
    const iconClasses = "h-4 w-4 flex-shrink-0"
    switch (type) {
      case 'youtube':
        return <Youtube className={`${iconClasses} text-red-500`} />
      case 'video':
      case 'video-playlist':
        return <Video className={`${iconClasses} text-blue-500`} />
      case 'pdf':
      case 'pdf-collection':
        return <FileText className={`${iconClasses} text-red-600`} />
      case 'reading':
        return <BookOpen className={`${iconClasses} text-green-600`} />
      case 'quiz':
        return <FileQuestion className={`${iconClasses} text-purple-600`} />
      default:
        return <Circle className={`${iconClasses} text-gray-500`} />
    }
  }

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'youtube': 'YouTube',
      'video': 'Video',
      'video-playlist': 'Playlist',
      'pdf': 'PDF',
      'pdf-collection': 'PDF Set',
      'reading': 'Reading',
      'quiz': 'Quiz'
    }
    return typeLabels[type] || type
  }

  const canPreview = item.type === 'youtube' || item.type === 'pdf' || item.type === 'video'

  return (
    <div className="bg-white/80 rounded-md border hover:bg-white hover:shadow-sm transition-all group overflow-hidden">
      {/* Mobile Layout */}
      <div className="block md:hidden p-3">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {index}
          </div>
          {getContentIcon(item.type)}
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
              {item.title}
            </h5>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            {canPreview ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-blue-50"
                onClick={() => onOpenMedia(item)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-9 flex-wrap">
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            {getTypeLabel(item.type)}
          </Badge>
          {item.duration && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.duration}</span>
          )}
          {item.size && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.size}</span>
          )}
          {item.pages && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.pages} pages</span>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between p-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {index}
          </div>
          {getContentIcon(item.type)}
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-sm group-hover:text-blue-600 transition-colors truncate">
              {item.title}
            </h5>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                {getTypeLabel(item.type)}
              </Badge>
              {item.duration && (
                <span className="text-xs text-muted-foreground">{item.duration}</span>
              )}
              {item.size && (
                <span className="text-xs text-muted-foreground">{item.size}</span>
              )}
              {item.pages && (
                <span className="text-xs text-muted-foreground">{item.pages} pages</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {item.completed ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
          {canPreview ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-blue-50"
              onClick={() => onOpenMedia(item)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
