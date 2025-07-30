
import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ContentItemRow } from './ContentItemRow'
import { ChevronDown, ChevronUp, BookOpen, Clock, Target } from "lucide-react"
import type { Topic, ContentItem } from '@/types/lms'

interface TopicListProps {
  topics: Topic[]
  expandedTopics: string[]
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
  onToggleTopic: (topicId: string) => void
  onOpenMedia: (content: ContentItem) => void
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  expandedTopics,
  subjectColor,
  onToggleTopic,
  onOpenMedia
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-3 ml-0 md:ml-6">
      {topics.map((topic) => (
        <Collapsible key={topic.id}>
          <div className="bg-white/60 rounded-lg border border-white/80 hover:bg-white/80 transition-colors overflow-hidden">
            <CollapsibleTrigger 
              className="w-full p-3 md:p-4 cursor-pointer"
              onClick={() => onToggleTopic(topic.id)}
            >
              {/* Mobile Layout */}
              <div className="block md:hidden">
                <div className="flex items-start gap-3 mb-2">
                  <BookOpen className={`h-4 w-4 flex-shrink-0 ${topic.completed ? subjectColor.primary : 'text-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm md:text-base mb-1 text-left break-words">
                      {topic.title}
                    </h4>
                  </div>
                  {topic.contentItems.length > 0 && (
                    <div className="flex-shrink-0">
                      {expandedTopics.includes(topic.id) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {topic.estimatedTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="whitespace-nowrap">{topic.estimatedTime}</span>
                      </div>
                    )}
                    <span className="whitespace-nowrap">{topic.contentItems.length} items</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.difficulty && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-0.5 ${getDifficultyColor(topic.difficulty)}`}
                    >
                      {topic.difficulty}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {topic.contentItems.length} items
                  </Badge>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className={`h-4 w-4 ${topic.completed ? subjectColor.primary : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <h4 className="font-medium text-base mb-1">{topic.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {topic.estimatedTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{topic.estimatedTime}</span>
                        </div>
                      )}
                      <span>{topic.contentItems.length} items</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {topic.difficulty && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getDifficultyColor(topic.difficulty)}`}
                    >
                      {topic.difficulty}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {topic.contentItems.length} items
                  </Badge>
                  {topic.contentItems.length > 0 && (
                    expandedTopics.includes(topic.id) ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            
            {topic.contentItems.length > 0 && (
              <CollapsibleContent className="animate-accordion-down">
                <div className="px-3 md:px-4 pb-3 md:pb-4">
                  <div className="space-y-2 ml-0 md:ml-6">
                    {topic.contentItems.map((item, index) => (
                      <ContentItemRow
                        key={item.id}
                        item={item}
                        index={index + 1}
                        onOpenMedia={onOpenMedia}
                      />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            )}
          </div>
        </Collapsible>
      ))}
    </div>
  )
}
