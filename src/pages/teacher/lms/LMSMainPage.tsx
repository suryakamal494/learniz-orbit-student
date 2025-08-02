
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { BookOpen, FileText, Folder, Video, Users } from 'lucide-react'

export default function LMSMainPage() {
  const navigate = useNavigate()

  const lmsModules = [
    {
      id: 'content',
      title: 'Content Management',
      description: 'Create and manage learning materials',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      path: '/teacher/lms/content',
      count: '24 items'
    },
    {
      id: 'series',
      title: 'Learning Series',
      description: 'Organize content into structured series',
      icon: <Video className="h-8 w-8 text-purple-500" />,
      path: '/teacher/lms/series',
      count: '8 series'
    },
    {
      id: 'notes',
      title: 'Notes Management',
      description: 'Manage and distribute study notes',
      icon: <FileText className="h-8 w-8 text-green-500" />,
      path: '/teacher/lms/notes',
      count: '156 notes'
    },
    {
      id: 'library',
      title: 'Content Library',
      description: 'Browse and organize all resources',
      icon: <Folder className="h-8 w-8 text-amber-500" />,
      path: '/teacher/lms/library',
      count: '340 files'
    },
    {
      id: 'directory',
      title: 'LMS Directory',
      description: 'Navigate content by subjects and topics',
      icon: <Folder className="h-8 w-8 text-cyan-500" />,
      path: '/teacher/lms/directory',
      count: 'All subjects'
    }
  ]

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Management System</h1>
          <p className="text-muted-foreground">Manage all your educational content and resources</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lmsModules.map((module) => (
          <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(module.path)}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {module.icon}
              </div>
              <CardTitle className="text-xl">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-4">{module.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{module.count}</span>
                <Button variant="outline" size="sm">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LMS Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">Content Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-muted-foreground">Learning Series</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">Study Notes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">340</div>
              <div className="text-sm text-muted-foreground">Library Files</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
