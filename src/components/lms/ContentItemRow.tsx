
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
    const iconClasses = "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Mobile-First Layout */}
      <div className="p-3 sm:p-4">
        {/* Top Row - Index, Icon, and Action Buttons */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Index Badge */}
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-medium text-gray-700">{index}</span>
            </div>
            
            {/* Content Icon */}
            <div className="flex-shrink-0 pt-0.5">
              {getContentIcon(item.type)}
            </div>
            
            {/* Title - Full width, multi-line */}
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-sm sm:text-base text-gray-900 leading-relaxed break-words">
                {item.title}
              </h5>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Completion Status */}
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            )}
            
            {/* Action Button */}
            {canPreview ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors flex-shrink-0"
                onClick={() => onOpenMedia(item)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-green-50 hover:text-green-600 rounded-full transition-colors flex-shrink-0"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Bottom Row - Metadata */}
        <div className="flex items-center justify-between gap-3 ml-9 sm:ml-10">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Type Badge */}
            <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-300 font-medium flex-shrink-0">
              {getTypeLabel(item.type)}
            </Badge>
          </div>
          
          {/* Metadata Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 flex-shrink-0">
            {item.duration && (
              <span className="whitespace-nowrap font-medium">{item.duration}</span>
            )}
            {item.size && (
              <span className="whitespace-nowrap font-medium">{item.size}</span>
            )}
            {item.pages && (
              <span className="whitespace-nowrap font-medium">{item.pages} pages</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop Enhancement - Hidden on mobile, enhanced on larger screens */}
      <div className="hidden lg:block">
        {/* Optional: Add any desktop-specific enhancements here */}
      </div>
    </div>
  )
}
