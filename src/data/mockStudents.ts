
import { Student, BatchStudentAssignment } from '@/types/student'

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@email.com',
    rollNumber: 'STU001',
    class: 'Class 12',
    phone: '+91 98765 43210',
    joinDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    rollNumber: 'STU002',
    class: 'Class 11',
    phone: '+91 98765 43211',
    joinDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    rollNumber: 'STU003',
    class: 'Class 12',
    phone: '+91 98765 43212',
    joinDate: '2024-02-01',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    rollNumber: 'STU004',
    class: 'Class 11',
    phone: '+91 98765 43213',
    joinDate: '2024-02-10',
    status: 'active'
  },
  {
    id: '5',
    name: 'Arjun Singh',
    email: 'arjun.singh@email.com',
    rollNumber: 'STU005',
    class: 'Class 12',
    phone: '+91 98765 43214',
    joinDate: '2024-02-15',
    status: 'active'
  },
  {
    id: '6',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@email.com',
    rollNumber: 'STU006',
    class: 'Class 11',
    phone: '+91 98765 43215',
    joinDate: '2024-03-01',
    status: 'active'
  },
  {
    id: '7',
    name: 'Vikram Joshi',
    email: 'vikram.joshi@email.com',
    rollNumber: 'STU007',
    class: 'Class 12',
    phone: '+91 98765 43216',
    joinDate: '2024-03-05',
    status: 'active'
  },
  {
    id: '8',
    name: 'Ananya Verma',
    email: 'ananya.verma@email.com',
    rollNumber: 'STU008',
    class: 'Class 11',
    phone: '+91 98765 43217',
    joinDate: '2024-03-10',
    status: 'active'
  },
  {
    id: '9',
    name: 'Karan Agarwal',
    email: 'karan.agarwal@email.com',
    rollNumber: 'STU009',
    class: 'Class 12',
    phone: '+91 98765 43218',
    joinDate: '2024-03-15',
    status: 'active'
  },
  {
    id: '10',
    name: 'Meera Nair',
    email: 'meera.nair@email.com',
    rollNumber: 'STU010',
    class: 'Class 11',
    phone: '+91 98765 43219',
    joinDate: '2024-03-20',
    status: 'active'
  },
  {
    id: '11',
    name: 'Rahul Mehta',
    email: 'rahul.mehta@email.com',
    rollNumber: 'STU011',
    class: 'Class 12',
    phone: '+91 98765 43220',
    joinDate: '2024-04-01',
    status: 'active'
  },
  {
    id: '12',
    name: 'Ishita Das',
    email: 'ishita.das@email.com',
    rollNumber: 'STU012',
    class: 'Class 11',
    phone: '+91 98765 43221',
    joinDate: '2024-04-05',
    status: 'active'
  },
  {
    id: '13',
    name: 'Nikhil Rajput',
    email: 'nikhil.rajput@email.com',
    rollNumber: 'STU013',
    class: 'Class 12',
    phone: '+91 98765 43222',
    joinDate: '2024-04-10',
    status: 'active'
  },
  {
    id: '14',
    name: 'Riya Jain',
    email: 'riya.jain@email.com',
    rollNumber: 'STU014',
    class: 'Class 11',
    phone: '+91 98765 43223',
    joinDate: '2024-04-15',
    status: 'active'
  },
  {
    id: '15',
    name: 'Siddharth Pillai',
    email: 'siddharth.pillai@email.com',
    rollNumber: 'STU015',
    class: 'Class 12',
    phone: '+91 98765 43224',
    joinDate: '2024-04-20',
    status: 'active'
  }
]

// Mock batch student assignments - which students are assigned to which batches
export const mockBatchStudentAssignments: BatchStudentAssignment[] = [
  // Batch 1 (Physics Advanced Batch A) students
  { studentId: '1', batchId: '1', assignedDate: '2024-01-15', isActive: true },
  { studentId: '3', batchId: '1', assignedDate: '2024-02-01', isActive: true },
  { studentId: '5', batchId: '1', assignedDate: '2024-02-15', isActive: true },
  { studentId: '7', batchId: '1', assignedDate: '2024-03-05', isActive: true },
  { studentId: '9', batchId: '1', assignedDate: '2024-03-15', isActive: true },
  
  // Batch 2 (Mathematics Foundation) students
  { studentId: '2', batchId: '2', assignedDate: '2024-01-20', isActive: true },
  { studentId: '4', batchId: '2', assignedDate: '2024-02-10', isActive: true },
  { studentId: '6', batchId: '2', assignedDate: '2024-03-01', isActive: true },
  { studentId: '8', batchId: '2', assignedDate: '2024-03-10', isActive: true },
  
  // Batch 3 (Chemistry Intensive) students
  { studentId: '11', batchId: '3', assignedDate: '2024-04-01', isActive: true },
  { studentId: '13', batchId: '3', assignedDate: '2024-04-10', isActive: true },
  { studentId: '15', batchId: '3', assignedDate: '2024-04-20', isActive: true },
  
  // Batch 4 (Biology Comprehensive) students
  { studentId: '12', batchId: '4', assignedDate: '2024-04-05', isActive: true },
  { studentId: '14', batchId: '4', assignedDate: '2024-04-15', isActive: true },
]

// Helper functions for managing student assignments
export const getStudentsForBatch = (batchId: string): Student[] => {
  const assignedStudentIds = mockBatchStudentAssignments
    .filter(assignment => assignment.batchId === batchId && assignment.isActive)
    .map(assignment => assignment.studentId)
  
  return mockStudents.filter(student => assignedStudentIds.includes(student.id))
}

export const isStudentAssignedToBatch = (studentId: string, batchId: string): boolean => {
  return mockBatchStudentAssignments.some(
    assignment => assignment.studentId === studentId && 
                 assignment.batchId === batchId && 
                 assignment.isActive
  )
}

export const getUniqueClasses = (): string[] => {
  const classes = mockStudents.map(student => student.class)
  return Array.from(new Set(classes))
}
