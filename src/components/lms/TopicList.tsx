
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
    <div className="space-y-3 ml-6">
      {topics.map((topic) => (
        <Collapsible key={topic.id}>
          <div className="bg-white/60 rounded-lg border border-white/80 hover:bg-white/80 transition-colors">
            <CollapsibleTrigger 
              className="w-full p-4 cursor-pointer"
              onClick={() => onToggleTopic(topic.id)}
            >
              <div className="flex items-center justify-between">
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
                <div className="px-4 pb-4">
                  <div className="space-y-2 ml-6">
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
