
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { 
  mockInstitutes, 
  mockSubjects, 
  mockChapters, 
  mockTopics 
} from '@/data/mockLMSContent'
import type { LMSContentType } from '@/types/lmsContent'

const contentTypeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'file', label: 'File' },
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Image' },
  { value: 'video-url', label: 'Video URL' },
  { value: 'iframe', label: 'Iframe' },
]

export default function CreateLMSContentPage() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    type: '' as LMSContentType | '',
    institute: '',
    subject: '',
    chapter: '',
    topic: '',
    content: '',
    url: '',
    description: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Filter dependencies
  const availableSubjects = useMemo(() => {
    if (!formData.institute) return mockSubjects
    const institute = mockInstitutes.find(inst => inst.name === formData.institute)
    return institute ? mockSubjects.filter(subject => subject.instituteId === institute.id) : mockSubjects
  }, [formData.institute])

  const availableChapters = useMemo(() => {
    if (!formData.subject) return mockChapters
    const subject = availableSubjects.find(sub => sub.name === formData.subject)
    return subject ? mockChapters.filter(chapter => chapter.subjectId === subject.id) : mockChapters
  }, [formData.subject, availableSubjects])

  const availableTopics = useMemo(() => {
    if (!formData.chapter) return mockTopics
    const chapter = availableChapters.find(chap => chap.name === formData.chapter)
    return chapter ? mockTopics.filter(topic => topic.chapterId === chapter.id) : mockTopics
  }, [formData.chapter, availableChapters])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Clear dependent fields when parent changes
      if (field === 'institute') {
        newData.subject = ''
        newData.chapter = ''
        newData.topic = ''
      } else if (field === 'subject') {
        newData.chapter = ''
        newData.topic = ''
      } else if (field === 'chapter') {
        newData.topic = ''
      }
      
      return newData
    })
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.type) {
      newErrors.type = 'Content type is required'
    }
    if (!formData.institute) {
      newErrors.institute = 'Institute is required'
    }
    if (!formData.subject) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.chapter) {
      newErrors.chapter = 'Chapter is required'
    }
    if (!formData.topic) {
      newErrors.topic = 'Topic is required'
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }

    // URL validation for certain types
    if ((formData.type === 'video-url' || formData.type === 'pdf' || formData.type === 'image' || formData.type === 'file') && !formData.url.trim()) {
      newErrors.url = 'URL is required for this content type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Creating content:', formData)
      // For now, just navigate back with a success message
      navigate('/teacher/lms/content')
    }
  }

  const handleCancel = () => {
    navigate('/teacher/lms/content')
  }

  const renderContentInput = () => {
    switch (formData.type) {
      case 'video-url':
      case 'image':
      case 'pdf':
      case 'file':
        return (
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="Enter the URL"
              className={errors.url ? 'border-red-500' : ''}
            />
            {errors.url && <p className="text-sm text-red-600">{errors.url}</p>}
          </div>
        )
      case 'iframe':
        return (
          <div className="space-y-2">
            <Label htmlFor="content">Iframe Code *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Enter the iframe HTML code"
              rows={4}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && <p className="text-sm text-red-600">{errors.content}</p>}
          </div>
        )
      case 'text':
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Enter your content"
              rows={6}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && <p className="text-sm text-red-600">{errors.content}</p>}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Content
            </Button>
            <h1 className="text-2xl font-bold">Create New Content</h1>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter content title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Content Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
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
                  {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                </div>
              </div>

              {/* Hierarchical Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institute">Institute *</Label>
                  <Select value={formData.institute} onValueChange={(value) => handleInputChange('institute', value)}>
                    <SelectTrigger className={errors.institute ? 'border-red-500' : ''}>
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
                  {errors.institute && <p className="text-sm text-red-600">{errors.institute}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => handleInputChange('subject', value)}
                    disabled={!formData.institute}
                  >
                    <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter *</Label>
                  <Select 
                    value={formData.chapter} 
                    onValueChange={(value) => handleInputChange('chapter', value)}
                    disabled={!formData.subject}
                  >
                    <SelectTrigger className={errors.chapter ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableChapters.map(chapter => (
                        <SelectItem key={chapter.id} value={chapter.name}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.chapter && <p className="text-sm text-red-600">{errors.chapter}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Select 
                    value={formData.topic} 
                    onValueChange={(value) => handleInputChange('topic', value)}
                    disabled={!formData.chapter}
                  >
                    <SelectTrigger className={errors.topic ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTopics.map(topic => (
                        <SelectItem key={topic.id} value={topic.name}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.topic && <p className="text-sm text-red-600">{errors.topic}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the content"
                />
              </div>

              {/* Dynamic Content Input */}
              {formData.type && renderContentInput()}

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
