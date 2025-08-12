
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { mockLMSContent, mockInstitutes, mockSubjects, mockChapters, mockTopics } from '@/data/mockLMSContent'
import type { LMSContentItem, LMSContentType } from '@/types/lmsContent'
import { useToast } from "@/components/ui/use-toast"

const contentTypeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'file', label: 'File' },
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Image' },
  { value: 'video-url', label: 'Video URL' },
  { value: 'iframe', label: 'Iframe' },
]

export default function EditLMSContentPage() {
  const { contentId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<Partial<LMSContentItem>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Find the content to edit
  const contentToEdit = mockLMSContent.find(content => content.id === contentId)

  useEffect(() => {
    if (contentToEdit) {
      setFormData(contentToEdit)
    }
  }, [contentToEdit])

  if (!contentToEdit) {
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

  const handleInputChange = (field: keyof LMSContentItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Content Updated",
        description: "The LMS content has been successfully updated.",
      })
      
      navigate('/teacher/lms/content')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit LMS Content</h1>
              <p className="text-gray-600">Modify the content details below</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Content Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter content title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Content Type *</Label>
                  <Select 
                    value={formData.type || ''} 
                    onValueChange={(value) => handleInputChange('type', value as LMSContentType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Institute, Subject, Chapter, Topic */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institute">Institute *</Label>
                  <Select 
                    value={formData.institute || ''} 
                    onValueChange={(value) => handleInputChange('institute', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select institute" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInstitutes.map(institute => (
                        <SelectItem key={institute.id} value={institute.name}>
                          {institute.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject || ''}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter *</Label>
                  <Input
                    id="chapter"
                    value={formData.chapter || ''}
                    onChange={(e) => handleInputChange('chapter', e.target.value)}
                    placeholder="Enter chapter"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    value={formData.topic || ''}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    placeholder="Enter topic"
                    required
                  />
                </div>
              </div>

              {/* URL field for certain content types */}
              {(formData.type === 'video-url' || formData.type === 'pdf' || formData.type === 'image' || formData.type === 'file') && (
                <div className="space-y-2">
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    value={formData.url || ''}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    placeholder="Enter URL"
                    required
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter content description"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content || ''}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter content"
                  rows={6}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => navigate('/teacher/lms/content')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Updating...' : 'Update Content'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
