
export interface AttendanceRecord {
  id: string;
  date: string;
  time: string;
  classTitle: string;
  batch: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  presentStudentsList: string[];
  absentStudentsList: string[];
}

export const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '10:00 AM',
    classTitle: 'Physics - Mechanics',
    batch: 'Grade 12A',
    totalStudents: 25,
    presentStudents: 23,
    absentStudents: 2,
    presentStudentsList: [
      'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown',
      'Frank Miller', 'Grace Lee', 'Henry Garcia', 'Ivy Martinez', 'Jack Anderson',
      'Kate Thompson', 'Liam Rodriguez', 'Mia Taylor', 'Noah Martinez', 'Olivia Clark',
      'Paul Lewis', 'Quinn Walker', 'Ruby Hall', 'Sam Allen', 'Tina Young',
      'Uma King', 'Victor Wright', 'Wendy Green'
    ],
    absentStudentsList: ['Jake Harris', 'Luna Scott']
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '2:30 PM',
    classTitle: 'Chemistry - Organic Compounds',
    batch: 'Grade 12B',
    totalStudents: 20,
    presentStudents: 18,
    absentStudents: 2,
    presentStudentsList: [
      'Anna Cooper', 'Ben Rogers', 'Chloe Murphy', 'Daniel Reed', 'Eva Bailey',
      'Felix Ward', 'Gina Foster', 'Hugo Butler', 'Iris Gray', 'James Cox',
      'Kelly Hughes', 'Leo Wood', 'Maya Russell', 'Nick Powell', 'Opal Jenkins',
      'Peter Perry', 'Quincy Long', 'Rose Coleman'
    ],
    absentStudentsList: ['Sean Brooks', 'Tara Watson']
  },
  {
    id: '3',
    date: '2024-01-13',
    time: '9:00 AM',
    classTitle: 'Mathematics - Calculus',
    batch: 'Grade 11A',
    totalStudents: 22,
    presentStudents: 20,
    absentStudents: 2,
    presentStudentsList: [
      'Adam Phillips', 'Beth Sanders', 'Chris Evans', 'Diana Price', 'Eric Bennett',
      'Faye Morris', 'Greg Turner', 'Helen Parker', 'Ian Cook', 'Jade Bell',
      'Kyle Ward', 'Lisa Stone', 'Mike Hayes', 'Nina Fisher', 'Oscar Mills',
      'Penny Cross', 'Quinn Stone', 'Ray Kelly', 'Sara Lane', 'Tom Fields'
    ],
    absentStudentsList: ['Will Stone', 'Zoe Rivers']
  },
  {
    id: '4',
    date: '2024-01-12',
    time: '11:30 AM',
    classTitle: 'Physics - Thermodynamics',
    batch: 'Grade 12A',
    totalStudents: 25,
    presentStudents: 25,
    absentStudents: 0,
    presentStudentsList: [
      'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown',
      'Frank Miller', 'Grace Lee', 'Henry Garcia', 'Ivy Martinez', 'Jack Anderson',
      'Kate Thompson', 'Liam Rodriguez', 'Mia Taylor', 'Noah Martinez', 'Olivia Clark',
      'Paul Lewis', 'Quinn Walker', 'Ruby Hall', 'Sam Allen', 'Tina Young',
      'Uma King', 'Victor Wright', 'Wendy Green', 'Jake Harris', 'Luna Scott'
    ],
    absentStudentsList: []
  },
  {
    id: '5',
    date: '2024-01-11',
    time: '3:00 PM',
    classTitle: 'Chemistry - Lab Session',
    batch: 'Grade 12B',
    totalStudents: 20,
    presentStudents: 16,
    absentStudents: 4,
    presentStudentsList: [
      'Anna Cooper', 'Ben Rogers', 'Chloe Murphy', 'Daniel Reed', 'Eva Bailey',
      'Felix Ward', 'Gina Foster', 'Hugo Butler', 'Iris Gray', 'James Cox',
      'Kelly Hughes', 'Leo Wood', 'Maya Russell', 'Nick Powell', 'Opal Jenkins', 'Peter Perry'
    ],
    absentStudentsList: ['Quincy Long', 'Rose Coleman', 'Sean Brooks', 'Tara Watson']
  }
];

export const getBatches = () => {
  return Array.from(new Set(mockAttendanceData.map(record => record.batch)));
};

export const getClasses = () => {
  return Array.from(new Set(mockAttendanceData.map(record => record.classTitle)));
};
