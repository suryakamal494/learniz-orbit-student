
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
      <div className="p-4 sm:p-5">
        {/* Top Section - Number and Title */}
        <div className="mb-4">
          <div className="flex items-start gap-3 mb-2">
            {/* Index Badge */}
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm sm:text-base font-semibold text-blue-700">{index}</span>
            </div>
            
            {/* Title - Prominent and Clear */}
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-base sm:text-lg text-gray-900 leading-relaxed break-words mb-1">
                {item.title}
              </h5>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Icons, Badges, and Actions */}
        <div className="space-y-3">
          {/* Content Type and Metadata Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Content Type Icon */}
              <div className="flex items-center gap-2">
                {getContentIcon(item.type)}
                <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-300 font-medium">
                  {getTypeLabel(item.type)}
                </Badge>
              </div>
            </div>
            
            {/* Metadata Info */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {item.duration && (
                <span className="whitespace-nowrap font-medium bg-gray-100 px-2 py-1 rounded">{item.duration}</span>
              )}
              {item.size && (
                <span className="whitespace-nowrap font-medium bg-gray-100 px-2 py-1 rounded">{item.size}</span>
              )}
              {item.pages && (
                <span className="whitespace-nowrap font-medium bg-gray-100 px-2 py-1 rounded">{item.pages} pages</span>
              )}
            </div>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Completion Status */}
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-400">
                    <Circle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Pending</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex items-center gap-2">
              {canPreview ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  onClick={() => onOpenMedia(item)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="text-xs font-medium">Preview</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-4 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-colors"
                >
                  <Play className="h-4 w-4 mr-2" />
                  <span className="text-xs font-medium">Start</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
