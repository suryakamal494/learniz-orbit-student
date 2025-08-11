import React, { useState } from 'react'
import { Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { mockInstructions } from '@/data/mockInstructions'
import { Instruction, InstructionFilters } from '@/types/instruction'

const InstructionsPage = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<InstructionFilters>({})
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredInstructions = mockInstructions.filter(instruction => {
    if (filters.subject && instruction.subject !== filters.subject) return false
    if (filters.institute && instruction.institute !== filters.institute) return false
    if (searchQuery && !instruction.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleFilterChange = (key: keyof InstructionFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }))
  }

  const getStatusColor = (status: Instruction['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Instructions</h1>
          <p className="text-muted-foreground mt-1">Manage exam instructions and guidelines</p>
        </div>
        <Button 
          onClick={() => navigate('/teacher/exams/instructions/create')}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Instructions
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select value={filters.institute || 'all'} onValueChange={(value) => handleFilterChange('institute', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Institute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutes</SelectItem>
                <SelectItem value="DPS">Delhi Public School</SelectItem>
                <SelectItem value="RVS">Ryan International School</SelectItem>
                <SelectItem value="DAV">DAV Public School</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.subject || 'all'} onValueChange={(value) => handleFilterChange('subject', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search instructions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setFilters({})}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            Instructions ({filteredInstructions.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredInstructions.map(instruction => (
              <Card key={instruction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge className={getStatusColor(instruction.status)}>
                        {instruction.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-2">{instruction.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {instruction.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{instruction.subject}</span>
                      <span>{instruction.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InstructionsPage
