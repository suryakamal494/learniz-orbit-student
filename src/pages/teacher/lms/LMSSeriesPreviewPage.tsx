
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Video, Image, Globe, Download, Eye, Calendar, User, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TeacherDataWrapper } from '@/components/teacher/ui/TeacherDataWrapper'
import { MediaViewer } from '@/components/MediaViewer'
import { mockLMSSeries } from '@/data/mockLMSSeries'
import { mockLMSContent } from '@/data/mockLMSContent'
import { LMSSeries, LMSSeriesType } from '@/types/lmsSeries'
import { LMSContentItem } from '@/types/lmsContent'

const LMSSeriesPreviewPage = () => {
  const { seriesId } = useParams()
  const navigate = useNavigate()
  const [mediaViewer, setMediaViewer] = useState<{
    isOpen: boolean
    content: LMSContentItem | null
  }>({
    isOpen: false,
    content: null
  })

  // Get series data and associated content
  const seriesData = useMemo(() => {
    const series = mockLMSSeries.find(s => s.id === seriesId)
    if (!series) return null

    // Filter content items that belong to this series
    const content = mockLMSContent.filter(item => 
      item.institute === series.institute &&
      item.subject === series.subject &&
      item.chapter === series.chapter &&
      item.topic === series.topic
    )

    return { series, content }
  }, [seriesId])

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video-url':
        return <Video className="h-5 w-5" />
      case 'pdf':
        return <FileText className="h-5 w-5" />
      case 'image':
        return <Image className="h-5 w-5" />
      case 'iframe':
        return <Globe className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getContentTypeColor = (type: string) => {
    const colors = {
      'video-url': 'bg-red-100 text-red-800 border-red-200',
      'pdf': 'bg-blue-100 text-blue-800 border-blue-200',
      'image': 'bg-green-100 text-green-800 border-green-200',
      'iframe': 'bg-purple-100 text-purple-800 border-purple-200',
      'text': 'bg-gray-100 text-gray-800 border-gray-200',
      'file': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getSeriesTypeColor = (type: LMSSeriesType) => {
    const colors = {
      'content-series': 'bg-blue-100 text-blue-800 border-blue-200',
      'video-series': 'bg-purple-100 text-purple-800 border-purple-200',
      'assignment-series': 'bg-green-100 text-green-800 border-green-200',
      'quiz-series': 'bg-orange-100 text-orange-800 border-orange-200',
      'exam-series': 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const formatSeriesType = (type: LMSSeriesType) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const openMediaViewer = (content: LMSContentItem) => {
    // Transform LMSContentItem to match MediaViewer expected format
    const transformedContent = {
      id: content.id,
      title: content.title,
      type: content.type === 'video-url' ? 'youtube' as const : 
            content.type === 'pdf' ? 'pdf' as const :
            content.type === 'image' ? 'video' as const : // Using video type for images
            'reading' as const,
      url: content.url,
      description: content.description
    }
    
    setMediaViewer({
      isOpen: true,
      content: transformedContent as any
    })
  }

  const closeMediaViewer = () => {
    setMediaViewer({
      isOpen: false,
      content: null
    })
  }

  if (!seriesData) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/lms/series')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Series
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Series Not Found</h2>
          <p className="text-muted-foreground">The requested series could not be found.</p>
        </div>
      </div>
    )
  }

  const { series, content } = seriesData

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/teacher/lms/series')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Series
        </Button>
      </div>

      {/* Series Information */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{series.title}</CardTitle>
              <p className="text-muted-foreground mb-4">
                {series.description || 'No description available'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Institute:</span>
                  <span>{series.institute}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Subject:</span>
                  <span>{series.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Created by:</span>
                  <span>{series.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Created:</span>
                  <span>{new Date(series.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Badge className={getSeriesTypeColor(series.type)}>
                {formatSeriesType(series.type)}
              </Badge>
              <Badge variant="secondary">
                {content.length} content items
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Chapter:</span>
              <span className="ml-2">{series.chapter}</span>
            </div>
            <div>
              <span className="font-medium">Topic:</span>
              <span className="ml-2">{series.topic}</span>
            </div>
            {series.subtopic && (
              <div>
                <span className="font-medium">Subtopic:</span>
                <span className="ml-2">{series.subtopic}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Content Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Items ({content.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TeacherDataWrapper
            data={content}
            emptyTitle="No content found"
            emptyDescription="This series doesn't have any content items yet."
            emptyIcon={<FileText className="h-8 w-8 text-muted-foreground" />}
          >
            {(data) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {item.description || 'No description available'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {getContentTypeIcon(item.type)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={getContentTypeColor(item.type)}
                        >
                          {item.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>
                          <span className="font-medium">Created by:</span> {item.createdBy}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openMediaViewer(item)}
                          className="flex-1 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {item.url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(item.url, '_blank')}
                            className="flex-1 text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TeacherDataWrapper>
        </CardContent>
      </Card>

      {/* Media Viewer Modal */}
      <MediaViewer
        isOpen={mediaViewer.isOpen}
        onClose={closeMediaViewer}
        content={mediaViewer.content}
      />
    </div>
  )
}

export default LMSSeriesPreviewPage
