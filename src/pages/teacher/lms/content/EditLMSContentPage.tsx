
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { mockLMSContent, mockInstitutes } from '@/data/mockLMSContent'
import { LMSContentItem, LMSContentType } from '@/types/lmsContent'

export default function EditLMSContentPage() {
  const { contentId } = useParams<{ contentId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<LMSContentItem | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'text' as LMSContentType,
    institute: '',
    subject: '',
    chapter: '',
    topic: '',
    content: '',
    url: '',
    description: ''
  })

  useEffect(() => {
    // Load content data
    const contentItem = mockLMSContent.find(item => item.id === contentId)
    if (contentItem) {
      setContent(contentItem)
      setFormData({
        title: contentItem.title,
        type: contentItem.type,
        institute: contentItem.institute,
        subject: contentItem.subject,
        chapter: contentItem.chapter,
        topic: contentItem.topic,
        content: contentItem.content,
        url: contentItem.url || '',
        description: contentItem.description || ''
      })
    }
  }, [contentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating content:', formData)
      navigate('/teacher/lms/content')
    } catch (error) {
      console.error('Error updating content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Content not found</h1>
          <Button onClick={() => navigate('/teacher/lms/content')} className="mt-4">
            Back to Content Library
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/teacher/lms/content')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Content</h1>
            <p className="text-muted-foreground">Update learning content details</p>
          </div>
        </div>
        <Button 
          variant="outline"
          onClick={() => navigate(`/teacher/lms/content/${contentId}/view`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Content Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video-url">Video URL</SelectItem>
                    <SelectItem value="iframe">Iframe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institute">Institute *</Label>
                <Select 
                  value={formData.institute} 
                  onValueChange={(value) => handleInputChange('institute', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter *</Label>
                <Input
                  id="chapter"
                  value={formData.chapter}
                  onChange={(e) => handleInputChange('chapter', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  required
                />
              </div>
            </div>

            {formData.type === 'video-url' && (
              <div className="space-y-2">
                <Label htmlFor="url">Video URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                placeholder="Optional description..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={8}
                required
                placeholder="Enter your content here..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/teacher/lms/content')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
