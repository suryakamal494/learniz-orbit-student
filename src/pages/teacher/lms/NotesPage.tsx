
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Search, Filter, Plus, Eye, Edit, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NotesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Sample notes data
  const notes = [
    {
      id: '1',
      title: 'Quantum Physics Fundamentals',
      subject: 'Physics',
      chapter: 'Modern Physics',
      type: 'Theory Notes',
      fileSize: '2.4 MB',
      downloads: 45,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      chapter: 'Organic Compounds',
      type: 'Summary',
      fileSize: '1.8 MB',
      downloads: 32,
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      title: 'Calculus Problem Solutions',
      subject: 'Mathematics',
      chapter: 'Differentiation',
      type: 'Practice Solutions',
      fileSize: '3.2 MB',
      downloads: 28,
      lastUpdated: '2024-01-13'
    }
  ]

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes Management</h1>
          <p className="text-muted-foreground">Create, organize, and distribute study notes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/teacher/lms')}>
            Back to LMS
          </Button>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/teacher/lms/notes/create')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Notes
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-blue-500" />
                <Badge variant="secondary">{note.type}</Badge>
              </div>
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{note.subject} • {note.chapter}</p>
                <p className="text-xs text-muted-foreground">
                  {note.fileSize} • {note.downloads} downloads
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Updated: {new Date(note.lastUpdated).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-muted-foreground">Total Notes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,245</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">Subjects Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">8.5 GB</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
