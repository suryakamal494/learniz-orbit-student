
import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TopicList } from './TopicList'
import { CheckCircle2, Play, Circle, ChevronDown, ChevronUp, Clock } from "lucide-react"
import type { Chapter, ContentItem } from '@/types/lms'

interface ChapterCardProps {
  chapter: Chapter
  isExpanded: boolean
  expandedTopics: string[]
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
  onToggleChapter: () => void
  onToggleTopic: (topicId: string) => void
  onOpenMedia: (content: ContentItem) => void
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  isExpanded,
  expandedTopics,
  subjectColor,
  onToggleChapter,
  onToggleTopic,
  onOpenMedia
}) => {
  const getStatusIcon = () => {
    switch (chapter.status) {
      case 'completed':
        return <CheckCircle2 className={`h-5 w-5 ${subjectColor.primary} flex-shrink-0`} />
      case 'current':
        return <Play className={`h-5 w-5 ${subjectColor.primary} flex-shrink-0`} />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    }
  }

  const getStatusBadge = () => {
    const baseClasses = chapter.status === 'completed' || chapter.status === 'current' 
      ? `${subjectColor.primary} bg-current/10` 
      : ''
    
    return (
      <Badge 
        variant={chapter.status === 'completed' ? 'default' : 'secondary'}
        className={`${baseClasses} text-xs px-2 py-1 flex-shrink-0`}
      >
        {chapter.status}
      </Badge>
    )
  }

  return (
    <Collapsible>
      <div className={`
        rounded-lg border-2 transition-all duration-300 animate-fade-in overflow-hidden
        ${chapter.status === 'completed' 
          ? `${subjectColor.bg} ${subjectColor.border} opacity-80` 
          : chapter.status === 'current'
          ? `${subjectColor.bg} ${subjectColor.border}`
          : 'bg-muted border-muted-foreground/20 opacity-60'
        }
      `}>
        <CollapsibleTrigger 
          className="w-full p-4 md:p-6 cursor-pointer hover:bg-white/20 transition-colors"
          onClick={onToggleChapter}
          disabled={chapter.status === 'locked'}
        >
          {/* Mobile Layout */}
          <div className="block md:hidden">
            <div className="flex items-start gap-3 mb-3">
              {getStatusIcon()}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-lg mb-1 text-left break-words">
                  {chapter.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {getStatusBadge()}
                {chapter.topics.length > 0 && (
                  isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {chapter.progress}% Complete
                </span>
                <Progress value={chapter.progress} className="w-20 h-2" />
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                {chapter.estimatedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="whitespace-nowrap">{chapter.estimatedTime}</span>
                  </div>
                )}
                {chapter.totalItems && (
                  <span className="whitespace-nowrap">
                    {chapter.completedItems || 0}/{chapter.totalItems} items
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon()}
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-1">{chapter.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{chapter.progress}% Complete</span>
                  {chapter.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{chapter.estimatedTime}</span>
                    </div>
                  )}
                  {chapter.totalItems && (
                    <span>{chapter.completedItems || 0}/{chapter.totalItems} items</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={chapter.progress} className="w-24 h-3" />
              {getStatusBadge()}
              {chapter.topics.length > 0 && (
                isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        {chapter.topics.length > 0 && (
          <CollapsibleContent className="animate-accordion-down">
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <TopicList
                topics={chapter.topics}
                expandedTopics={expandedTopics}
                subjectColor={subjectColor}
                onToggleTopic={onToggleTopic}
                onOpenMedia={onOpenMedia}
              />
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  )
}
