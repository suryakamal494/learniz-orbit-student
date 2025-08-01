
import { TeacherScheduleClass } from '@/types/teacherSchedule';

export const mockTeacherScheduleClasses: TeacherScheduleClass[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '09:00 AM',
    duration: '1h 30m',
    class: 'Class 12',
    batch: 'Science A',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    faculty: 'Dr. Sarah Johnson',
    resources: [
      { type: 'video', url: '/videos/physics-1', title: 'Introduction Video' },
      { type: 'lms', url: '/lms/physics-1', title: 'Study Material' },
    ],
    urlView: '/class/physics/electromagnetic-induction',
    assignedLMS: true,
    assignedNotes: false,
    assignedLiveQuiz: true,
  },
  {
    id: '2',
    date: '2024-01-15',
    time: '11:00 AM',
    duration: '1h 30m',
    class: 'Class 11',
    batch: 'Commerce B',
    subject: 'Mathematics',
    topic: 'Calculus Fundamentals',
    faculty: 'Prof. Michael Chen',
    resources: [
      { type: 'document', url: '/docs/math-1', title: 'Formula Sheet' },
      { type: 'quiz', url: '/quiz/math-1', title: 'Practice Quiz' },
    ],
    urlView: '/class/math/calculus-fundamentals',
    assignedLMS: false,
    assignedNotes: true,
    assignedLiveQuiz: false,
  },
  {
    id: '3',
    date: '2024-01-16',
    time: '02:00 PM',
    duration: '1h',
    class: 'Class 10',
    batch: 'Science A',
    subject: 'Chemistry',
    topic: 'Organic Chemistry Basics',
    faculty: 'Dr. Emily Davis',
    resources: [
      { type: 'video', url: '/videos/chem-1', title: 'Lab Demo' },
      { type: 'lms', url: '/lms/chem-1', title: 'Interactive Exercises' },
    ],
    urlView: '/class/chemistry/organic-basics',
    assignedLMS: true,
    assignedNotes: true,
    assignedLiveQuiz: true,
  },
];

export const getUniqueTeacherSubjects = () => {
  return [...new Set(mockTeacherScheduleClasses.map(cls => cls.subject))];
};

export const getUniqueTeacherClasses = () => {
  return [...new Set(mockTeacherScheduleClasses.map(cls => cls.class))];
};

export const getUniqueTeacherBatches = () => {
  return [...new Set(mockTeacherScheduleClasses.map(cls => cls.batch))];
};
