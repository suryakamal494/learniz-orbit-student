
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChapterCard } from './ChapterCard'
import { MediaViewer } from '../MediaViewer'
import type { LMSData, ContentItem } from '@/types/lms'

interface LMSContainerProps {
  data: LMSData
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
}

export const LMSContainer: React.FC<LMSContainerProps> = ({ data, subjectColor }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])
  const [mediaViewer, setMediaViewer] = useState<{
    isOpen: boolean
    content: ContentItem | null
  }>({
    isOpen: false,
    content: null
  })

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const openMediaViewer = (content: ContentItem) => {
    setMediaViewer({
      isOpen: true,
      content
    })
  }

  const closeMediaViewer = () => {
    setMediaViewer({
      isOpen: false,
      content: null
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Learning Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.chapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                isExpanded={expandedChapters.includes(chapter.id)}
                expandedTopics={expandedTopics}
                subjectColor={subjectColor}
                onToggleChapter={() => toggleChapter(chapter.id)}
                onToggleTopic={toggleTopic}
                onOpenMedia={openMediaViewer}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <MediaViewer
        isOpen={mediaViewer.isOpen}
        onClose={closeMediaViewer}
        content={mediaViewer.content}
      />
    </>
  )
}
