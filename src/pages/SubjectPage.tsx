
import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LMSContainer } from '@/components/lms/LMSContainer'
import { ExamsContainer } from '@/components/exams/ExamsContainer'
import { NotesContainer } from '@/components/notes/NotesContainer'

import { mockLMSData } from '@/data/mockLMS'
import { mockExamData } from '@/data/mockExams'
import { mockNotesData } from '@/data/mockNotes'

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('lms')

  // Get subject name from location state or fallback to default
  const subjectName = location.state?.subjectName || 'Subject'

  const handleBack = () => {
    navigate('/dashboard')
  }

  const getSubjectColor = (name: string, id: string) => {
    const colors = [
      {
        primary: "text-blue-700",
        bg: "bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600"
      },
      {
        primary: "text-purple-700", 
        bg: "bg-gradient-to-br from-purple-50 via-purple-50/80 to-indigo-100/60",
        border: "border-purple-200",
        gradient: "from-purple-500 to-indigo-600"
      },
      {
        primary: "text-emerald-700",
        bg: "bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-100/60", 
        border: "border-emerald-200",
        gradient: "from-emerald-500 to-teal-600"
      },
      {
        primary: "text-orange-700",
        bg: "bg-gradient-to-br from-orange-50 via-orange-50/80 to-red-100/60",
        border: "border-orange-200", 
        gradient: "from-orange-500 to-red-500"
      }
    ]
    
    const index = parseInt(id || '0') - 1
    return colors[index % colors.length]
  }

  const subjectColor = getSubjectColor(subjectName, subjectId || '1')

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="space-y-4 md:space-y-6 p-4 md:p-8 max-w-full">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-10 w-10 hover:bg-muted/50 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${subjectColor.gradient} text-white shadow-md flex-shrink-0`}>
              <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                {subjectName}
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Explore course materials and assessments
              </p>
            </div>
          </div>
        </div>

        {/* Subject Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 min-w-[300px] md:w-96 glass border-border/40">
              <TabsTrigger value="lms" className="text-xs md:text-sm font-medium px-2 md:px-4">
                LMS
              </TabsTrigger>
              <TabsTrigger value="exams" className="text-xs md:text-sm font-medium px-2 md:px-4">
                Exams
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs md:text-sm font-medium px-2 md:px-4">
                Study Notes
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lms" className="space-y-4 animate-fade-in">
            <LMSContainer 
              data={mockLMSData} 
              subjectColor={subjectColor}
            />
          </TabsContent>

          <TabsContent value="exams" className="space-y-4 animate-fade-in">
            <ExamsContainer 
              data={mockExamData} 
              subjectColor={subjectColor}
            />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 animate-fade-in">
            <NotesContainer 
              data={mockNotesData} 
              subjectColor={subjectColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
