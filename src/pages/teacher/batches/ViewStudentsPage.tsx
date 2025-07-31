
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Save, Users, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SchedulePagination } from '@/components/schedule/SchedulePagination'
import { mockStudents, mockBatchStudentAssignments, getUniqueClasses, isStudentAssignedToBatch } from '@/data/mockStudents'
import { mockBatches } from '@/data/mockBatches'
import { useToast } from '@/hooks/use-toast'
import { Student } from '@/types/student'

export default function ViewStudentsPage() {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  // Find the current batch
  const batch = mockBatches.find(b => b.id === batchId)
  
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  // Initialize selected students with currently assigned ones
  React.useEffect(() => {
    if (batchId) {
      const assignedStudentIds = new Set(
        mockBatchStudentAssignments
          .filter(assignment => assignment.batchId === batchId && assignment.isActive)
          .map(assignment => assignment.studentId)
      )
      setSelectedStudents(assignedStudentIds)
    }
  }, [batchId])

  // Filter students based on search and class filter
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesClass = classFilter === 'all' || student.class === classFilter
      return matchesSearch && matchesClass && student.status === 'active'
    })
  }, [searchQuery, classFilter])

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize)

  // Get unique classes for filter
  const availableClasses = getUniqueClasses()

  // Handle student selection
  const handleStudentToggle = (studentId: string) => {
    const newSelectedStudents = new Set(selectedStudents)
    if (newSelectedStudents.has(studentId)) {
      newSelectedStudents.delete(studentId)
    } else {
      newSelectedStudents.add(studentId)
    }
    setSelectedStudents(newSelectedStudents)
  }

  // Handle select all/none for current page
  const handleSelectAllCurrentPage = () => {
    const newSelectedStudents = new Set(selectedStudents)
    const allCurrentPageSelected = paginatedStudents.every(student => 
      selectedStudents.has(student.id)
    )

    if (allCurrentPageSelected) {
      // Unselect all on current page
      paginatedStudents.forEach(student => {
        newSelectedStudents.delete(student.id)
      })
    } else {
      // Select all on current page
      paginatedStudents.forEach(student => {
        newSelectedStudents.add(student.id)
      })
    }
    setSelectedStudents(newSelectedStudents)
  }

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!batchId) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would make actual API calls to update student assignments
      console.log('Updating batch assignments:', {
        batchId,
        selectedStudentIds: Array.from(selectedStudents)
      })
      
      toast({
        title: "Students Updated Successfully",
        description: `Updated student assignments for ${batch?.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update student assignments",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate assignment changes
  const originallyAssigned = new Set(
    mockBatchStudentAssignments
      .filter(assignment => assignment.batchId === batchId && assignment.isActive)
      .map(assignment => assignment.studentId)
  )
  
  const toAdd = Array.from(selectedStudents).filter(id => !originallyAssigned.has(id))
  const toRemove = Array.from(originallyAssigned).filter(id => !selectedStudents.has(id))
  const hasChanges = toAdd.length > 0 || toRemove.length > 0

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900">Batch Not Found</h1>
            <Button onClick={() => navigate('/teacher/batches')} className="mt-4">
              Back to Batches
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/teacher/batches')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Batches
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Students</h1>
            <p className="text-gray-600 mt-1">
              Assign students to <span className="font-medium">{batch.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{selectedStudents.size} selected</span>
            </div>
            <Button
              onClick={handleSaveChanges}
              disabled={!hasChanges || isLoading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Changes Summary */}
        {hasChanges && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Pending Changes:</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              {toAdd.length > 0 && (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>Adding {toAdd.length} students</span>
                </div>
              )}
              {toRemove.length > 0 && (
                <div className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-4 w-4" />
                  <span>Removing {toRemove.length} students</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {availableClasses.map(className => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedStudents.length > 0 && paginatedStudents.every(student => selectedStudents.has(student.id))}
                    onCheckedChange={handleSelectAllCurrentPage}
                  />
                </TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Assignment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => {
                const isSelected = selectedStudents.has(student.id)
                const wasOriginallyAssigned = isStudentAssignedToBatch(student.id, batchId!)
                
                return (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {isSelected && !wasOriginallyAssigned && (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          To Add
                        </Badge>
                      )}
                      {!isSelected && wasOriginallyAssigned && (
                        <Badge variant="outline" className="text-red-600 border-red-300">
                          To Remove
                        </Badge>
                      )}
                      {isSelected && wasOriginallyAssigned && (
                        <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-300">
                          Assigned
                        </Badge>
                      )}
                      {!isSelected && !wasOriginallyAssigned && (
                        <span className="text-gray-400 text-sm">Not Assigned</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {paginatedStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-500">
                {searchQuery || classFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No students available in the system'
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <SchedulePagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>
    </div>
  )
}
