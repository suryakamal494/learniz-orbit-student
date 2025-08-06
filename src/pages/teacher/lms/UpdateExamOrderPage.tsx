
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeacherDataWrapper } from '@/components/teacher/ui/TeacherDataWrapper'
import { ContentOrderTable } from '@/components/teacher/lms/order/ContentOrderTable'
import { mockLMSSeries } from '@/data/mockLMSSeries'
import { mockLMSContent } from '@/data/mockLMSContent'
import { mockExamsData } from '@/data/mockExamsData'
import { LMSContentItem } from '@/types/lmsContent'
import { ExamData } from '@/types/exam'
import { toast } from '@/components/ui/use-toast'

interface ContentItemWithOrder extends LMSContentItem {
  order: number
  assignedQuizId?: string
}

const UpdateExamOrderPage = () => {
  const { seriesId } = useParams<{ seriesId: string }>()
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [seriesData, setSeriesData] = useState<any>(null)
  const [contentItems, setContentItems] = useState<ContentItemWithOrder[]>([])
  const [availableExams, setAvailableExams] = useState<ExamData[]>([])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      try {
        // Find the series
        const series = mockLMSSeries.find(s => s.id === seriesId)
        if (!series) {
          toast({
            title: "Error",
            description: "Series not found",
            variant: "destructive"
          })
          navigate('/teacher/lms/series')
          return
        }

        setSeriesData(series)

        // Get content items for this series (simulate by filtering by subject/chapter)
        const relatedContent = mockLMSContent.filter(item => 
          item.subject === series.subject && 
          item.chapter === series.chapter
        )

        // Add order and quiz assignment to content items
        const contentWithOrder = relatedContent.map((item, index) => ({
          ...item,
          order: index + 1,
          assignedQuizId: undefined
        }))

        setContentItems(contentWithOrder)
        setAvailableExams(mockExamsData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load series data",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (seriesId) {
      loadData()
    }
  }, [seriesId, navigate])

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...contentItems]
    const draggedItem = updatedItems[dragIndex]
    
    // Remove the dragged item
    updatedItems.splice(dragIndex, 1)
    // Insert it at the new position
    updatedItems.splice(hoverIndex, 0, draggedItem)
    
    // Update order numbers
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    
    setContentItems(reorderedItems)
  }

  const handleQuizAssignment = (contentId: string, quizId: string | undefined) => {
    setContentItems(items => 
      items.map(item => 
        item.id === contentId 
          ? { ...item, assignedQuizId: quizId }
          : item
      )
    )
  }

  const handleUpdate = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      // Simulate saving the updated order and quiz assignments
      console.log('Saving updated content order:', contentItems)
      
      toast({
        title: "Success",
        description: "Content order and quiz assignments updated successfully",
      })
      
      // Navigate back to series list
      navigate('/teacher/lms/series')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content order",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/lms/series')}
          className="self-start"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Series
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Update Exam Order
          </h1>
          {seriesData && (
            <p className="text-muted-foreground mt-1">
              Managing content order and quiz assignments for "{seriesData.title}"
            </p>
          )}
        </div>
      </div>

      {/* Series Info Card */}
      {seriesData && (
        <Card>
          <CardHeader>
            <CardTitle>Series Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Institute:</span>
                <p className="font-semibold">{seriesData.institute}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Subject:</span>
                <p className="font-semibold">{seriesData.subject}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Chapter:</span>
                <p className="font-semibold">{seriesData.chapter}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Topic:</span>
                <p className="font-semibold">{seriesData.topic}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Order Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content Order & Quiz Assignment</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder content items, and assign quizzes to each item.
          </p>
        </CardHeader>
        <CardContent>
          <TeacherDataWrapper
            data={contentItems}
            loading={isLoading}
            emptyTitle="No content items found"
            emptyDescription="No content items are available for this series."
          >
            {(data) => (
              <ContentOrderTable
                contentItems={data}
                availableExams={availableExams}
                onReorder={handleReorder}
                onQuizAssignment={handleQuizAssignment}
              />
            )}
          </TeacherDataWrapper>
        </CardContent>
      </Card>

      {/* Update Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={handleUpdate}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
          size="lg"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? 'Updating...' : 'UPDATE'}
        </Button>
      </div>
    </div>
  )
}

export default UpdateExamOrderPage
