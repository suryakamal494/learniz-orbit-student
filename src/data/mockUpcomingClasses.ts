
export interface UpcomingClass {
  id: string;
  title: string;
  subject: string;
  class: string;
  batch: string;
  time: string;
  duration: string;
  date: string;
  type: 'Live' | 'Lab' | 'Discussion' | 'Review';
  enrolledStudents: number;
  completionRate: number;
  status: 'upcoming' | 'live' | 'completed';
  streamingUrl?: string;
  color: string;
}

export const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: '1',
    title: 'Electromagnetic Induction',
    subject: 'Physics',
    class: 'Class 12',
    batch: 'Science A',
    time: '09:00 AM',
    duration: '60 mins',
    date: '2024-01-15',
    type: 'Live',
    enrolledStudents: 32,
    completionRate: 85,
    status: 'upcoming',
    streamingUrl: 'https://example.com/stream/physics-1',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: '2',
    title: 'Organic Chemistry Lab',
    subject: 'Chemistry',
    class: 'Class 11',
    batch: 'Science B',
    time: '11:30 AM',
    duration: '90 mins',
    date: '2024-01-15',
    type: 'Lab',
    enrolledStudents: 28,
    completionRate: 92,
    status: 'upcoming',
    color: 'from-green-400 to-green-600'
  },
  {
    id: '3',
    title: 'Calculus Problem Solving',
    subject: 'Mathematics',
    class: 'Class 12',
    batch: 'Science C',
    time: '02:00 PM',
    duration: '75 mins',
    date: '2024-01-15',
    type: 'Discussion',
    enrolledStudents: 35,
    completionRate: 78,
    status: 'upcoming',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: '4',
    title: 'Biology Revision',
    subject: 'Biology',
    class: 'Class 10',
    batch: 'General A',
    time: '04:30 PM',
    duration: '45 mins',
    date: '2024-01-15',
    type: 'Review',
    enrolledStudents: 40,
    completionRate: 95,
    status: 'upcoming',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: '5',
    title: 'English Literature Discussion',
    subject: 'English',
    class: 'Class 11',
    batch: 'Commerce A',
    time: '10:00 AM',
    duration: '50 mins',
    date: '2024-01-16',
    type: 'Discussion',
    enrolledStudents: 25,
    completionRate: 88,
    status: 'upcoming',
    color: 'from-pink-400 to-pink-600'
  }
];
