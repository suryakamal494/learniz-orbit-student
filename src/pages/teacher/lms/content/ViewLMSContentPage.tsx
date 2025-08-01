
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, User } from "lucide-react"
import { mockLMSContent } from '@/data/mockLMSContent'
import { RichContentDisplay } from '@/components/ui/rich-content-display'

export default function ViewLMSContentPage() {
  const { contentId } = useParams()
  const navigate = useNavigate()
  
  const content = mockLMSContent.find(item => item.id === contentId)

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Content Not Found</h2>
            <p className="text-gray-600 mb-4">The requested content could not be found.</p>
            <Button onClick={() => navigate('/teacher/lms/content')}>
              Back to Content
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleEdit = () => {
    navigate(`/teacher/lms/content/${contentId}/edit`)
  }

  const renderContentPreview = () => {
    switch (content.type) {
      case 'video-url':
        if (content.url?.includes('youtube.com') || content.url?.includes('youtu.be')) {
          const videoId = content.url.includes('youtu.be') 
            ? content.url.split('youtu.be/')[1]?.split('?')[0]
            : content.url.split('v=')[1]?.split('&')[0]
          
          if (videoId) {
            return (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          }
        }
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">Video URL: {content.url}</p>
          </div>
        )
      
      case 'pdf':
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-2">PDF Document</p>
            {content.url && (
              <Button asChild variant="outline">
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </Button>
            )}
          </div>
        )
      
      case 'image':
        return content.url ? (
          <div className="max-w-2xl">
            <img 
              src={content.url} 
              alt={content.title}
              className="w-full h-auto rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg'
              }}
            />
          </div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">Image content</p>
          </div>
        )
      
      case 'iframe':
        return (
          <div className="w-full">
            <div 
              className="w-full min-h-96 bg-white border rounded-lg"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        )
      
      case 'file':
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-2">File Content</p>
            {content.url && (
              <Button asChild variant="outline">
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
              </Button>
            )}
          </div>
        )
      
      case 'text':
      default:
        return (
          <div className="prose max-w-none">
            <RichContentDisplay content={content.content} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/teacher/lms/content')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Content
            </Button>
          </div>
          <Button onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Content
          </Button>
        </div>

        {/* Content Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{content.title}</CardTitle>
                {content.description && (
                  <p className="text-gray-600">{content.description}</p>
                )}
              </div>
              <Badge variant="secondary" className="ml-4">
                {content.type.toUpperCase()}
              </Badge>
            </div>
            
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Institute</p>
                <p className="font-medium">{content.institute}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium">{content.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Chapter</p>
                <p className="font-medium">{content.chapter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Topic</p>
                <p className="font-medium">{content.topic}</p>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Created by {content.createdBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created on {new Date(content.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Content Preview</h3>
              {renderContentPreview()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
