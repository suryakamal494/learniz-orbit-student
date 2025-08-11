
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, FileText, Video, Image, Code, File, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { mockLMSContent, mockInstitutes, mockSubjects, mockChapters, mockTopics } from '@/data/mockLMSContent'
import { LMSContentItem, LMSContentType } from '@/types/lmsContent'

const EditLMSContentPage = () => {
  const { contentId } = useParams<{ contentId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<LMSContentItem>>({})

  useEffect(() => {
    // Find the content item by ID
    const content = mockLMSContent.find(item => item.id === contentId)
    if (content) {
      setFormData(content)
    }
  }, [contentId])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Saving content:', formData)
      navigate('/teacher/lms/content')
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setLoading(false)
    }
  }

  const getContentTypeIcon = (type: LMSContentType) => {
    switch (type) {
      case 'video-url': return <Video className="h-4 w-4" />
      case 'pdf': return <FileText className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'iframe': return <Code className="h-4 w-4" />
      case 'file': return <File className="h-4 w-4" />
      default: return <Type className="h-4 w-4" />
    }
  }

  if (!formData.id) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Content Not Found</h1>
          <p className="text-muted-foreground mt-2">The requested content could not be found.</p>
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
            variant="ghost"
            size="icon"
            onClick={() => navigate('/teacher/lms/content')}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Content</h1>
            <p className="text-muted-foreground">Modify your learning content</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getContentTypeIcon(formData.type!)}
            Edit Content Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter content title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: LMSContentType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institute">Institute</Label>
              <Select
                value={formData.institute}
                onValueChange={(value) => setFormData({ ...formData, institute: value })}
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
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject || ''}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Enter subject"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter</Label>
              <Input
                id="chapter"
                value={formData.chapter || ''}
                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                placeholder="Enter chapter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={formData.topic || ''}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Enter topic"
              />
            </div>
          </div>

          {(formData.type === 'video-url' || formData.type === 'pdf' || formData.type === 'file' || formData.type === 'image') && (
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="Enter content URL"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter content description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter content details"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditLMSContentPage
