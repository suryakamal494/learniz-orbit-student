
import { TeacherScheduleClass } from '@/types/teacherSchedule';

export const mockTeacherScheduleClasses: TeacherScheduleClass[] = [
  {
    id: '1',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '90 mins',
    class: 'Class 9',
    batch: 'Class 9 Disha',
    subject: 'Mathematics',
    topic: 'Quadratic Equations - Advanced Problem Solving',
    meetingUrl: 'https://zoom.us/j/123456789',
    status: 'scheduled',
    createdBy: 'Dr. Priya Sharma',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-12T15:30:00Z'
  },
  {
    id: '2',
    date: '2024-02-15',
    time: '2:00 PM',
    duration: '75 mins',
    class: 'Class 10',
    batch: 'Class 10 Arjuna',
    subject: 'Physics',
    topic: 'Light - Reflection and Refraction Laws',
    meetingUrl: 'https://zoom.us/j/987654321',
    status: 'scheduled',
    createdBy: 'Prof. Rajesh Kumar',
    createdAt: '2024-02-08T14:20:00Z',
    updatedAt: '2024-02-10T11:45:00Z'
  },
  {
    id: '3',
    date: '2024-02-16',
    time: '11:30 AM',
    duration: '105 mins',
    class: 'Class 8',
    batch: 'Class 8 Bheem',
    subject: 'Chemistry',
    topic: 'Atomic Structure and Chemical Bonding',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
    createdBy: 'Dr. Anita Verma',
    createdAt: '2024-02-11T09:15:00Z',
    updatedAt: '2024-02-13T16:20:00Z'
  },
  {
    id: '4',
    date: '2024-02-16',
    time: '9:00 AM',
    duration: '90 mins',
    class: 'Class 7',
    batch: 'Class 7 Hanuman',
    subject: 'English',
    topic: 'Grammar - Active and Passive Voice Practice',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/xyz',
    status: 'completed',
    createdBy: 'Ms. Sarah Johnson',
    createdAt: '2024-02-05T12:00:00Z',
    updatedAt: '2024-02-15T10:30:00Z'
  },
  {
    id: '5',
    date: '2024-02-17',
    time: '3:30 PM',
    duration: '80 mins',
    class: 'Class 9',
    batch: 'Class 9 Krishna',
    subject: 'Biology',
    topic: 'Cell Division - Mitosis and Meiosis',
    meetingUrl: 'https://zoom.us/j/456789123',
    status: 'scheduled',
    createdBy: 'Dr. Ravi Patel',
    createdAt: '2024-02-12T08:45:00Z',
    updatedAt: '2024-02-14T13:15:00Z'
  }
];

export const getUniqueTeacherClasses = (): string[] => {
  const classes = mockTeacherScheduleClasses.map(cls => cls.class);
  return Array.from(new Set(classes)).sort();
};

export const getUniqueTeacherBatches = (): string[] => {
  const batches = mockTeacherScheduleClasses.map(cls => cls.batch);
  return Array.from(new Set(batches)).sort();
};

export const getBatchesByClass = (selectedClass?: string): string[] => {
  if (!selectedClass) return getUniqueTeacherBatches();
  
  const batches = mockTeacherScheduleClasses
    .filter(cls => cls.class === selectedClass)
    .map(cls => cls.batch);
  return Array.from(new Set(batches)).sort();
};
