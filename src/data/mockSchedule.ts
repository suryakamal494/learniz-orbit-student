
import { ScheduleClass } from '@/types/schedule';

export const mockScheduleClasses: ScheduleClass[] = [
  {
    id: '1',
    date: '2024-01-28',
    time: '10:00 AM',
    duration: '1h 30m',
    class: 'Class 9',
    batch: 'Class 9 Disha',
    subject: 'Mathematics',
    topic: 'Quadratic Equations - Solving by Factorization',
    faculty: 'Dr. Priya Sharma',
    resources: [
      { type: 'video', url: 'https://example.com/recording1', title: 'Class Recording' },
      { type: 'lms', url: 'https://example.com/lms1', title: 'Practice Problems' },
      { type: 'quiz', url: 'https://example.com/quiz1', title: 'Quick Assessment' }
    ]
  },
  {
    id: '2',
    date: '2024-01-27',
    time: '2:00 PM',
    duration: '1h 15m',
    class: 'Class 10',
    batch: 'Class 10 Arjuna',
    subject: 'Physics',
    topic: 'Light - Reflection and Refraction',
    faculty: 'Prof. Rajesh Kumar',
    resources: [
      { type: 'video', url: 'https://example.com/recording2', title: 'Experiment Demo' },
      { type: 'lms', url: 'https://example.com/lms2', title: 'Theory Notes' }
    ]
  },
  {
    id: '3',
    date: '2024-01-26',
    time: '11:30 AM',
    duration: '1h 45m',
    class: 'Class 9',
    batch: 'Class 9 Disha',
    subject: 'Chemistry',
    topic: 'Atoms and Molecules - Molecular Mass Calculations',
    faculty: 'Dr. Anita Verma',
    resources: [
      { type: 'video', url: 'https://example.com/recording3', title: 'Lab Session' },
      { type: 'quiz', url: 'https://example.com/quiz3', title: 'Concept Check' }
    ]
  },
  {
    id: '4',
    date: '2024-01-25',
    time: '9:00 AM',
    duration: '1h 30m',
    class: 'Class 8',
    batch: 'Class 8 Bheem',
    subject: 'English',
    topic: 'Grammar - Active and Passive Voice',
    faculty: 'Ms. Sarah Johnson',
    resources: [
      { type: 'video', url: 'https://example.com/recording4', title: 'Interactive Session' },
      { type: 'lms', url: 'https://example.com/lms4', title: 'Exercise Sheets' },
      { type: 'quiz', url: 'https://example.com/quiz4', title: 'Grammar Test' }
    ]
  },
  {
    id: '5',
    date: '2024-01-24',
    time: '3:30 PM',
    duration: '1h 20m',
    class: 'Class 10',
    batch: 'Class 10 Arjuna',
    subject: 'Mathematics',
    topic: 'Trigonometry - Introduction to Ratios',
    faculty: 'Dr. Priya Sharma',
    resources: [
      { type: 'video', url: 'https://example.com/recording5', title: 'Concept Building' },
      { type: 'lms', url: 'https://example.com/lms5', title: 'Reference Materials' }
    ]
  },
  {
    id: '6',
    date: '2024-01-23',
    time: '1:00 PM',
    duration: '1h 40m',
    class: 'Class 9',
    batch: 'Class 9 Krishna',
    subject: 'Biology',
    topic: 'Cell Structure and Functions',
    faculty: 'Dr. Ravi Patel',
    resources: [
      { type: 'video', url: 'https://example.com/recording6', title: 'Microscopy Demo' },
      { type: 'lms', url: 'https://example.com/lms6', title: 'Cell Diagrams' },
      { type: 'quiz', url: 'https://example.com/quiz6', title: 'Structure Quiz' }
    ]
  },
  {
    id: '7',
    date: '2024-01-22',
    time: '10:15 AM',
    duration: '1h 25m',
    class: 'Class 8',
    batch: 'Class 8 Bheem',
    subject: 'History',
    topic: 'The Mughal Empire - Akbar\'s Policies',
    faculty: 'Prof. Meera Joshi',
    resources: [
      { type: 'video', url: 'https://example.com/recording7', title: 'Documentary Clips' },
      { type: 'lms', url: 'https://example.com/lms7', title: 'Timeline Resources' }
    ]
  },
  {
    id: '8',
    date: '2024-01-21',
    time: '4:00 PM',
    duration: '1h 35m',
    class: 'Class 10',
    batch: 'Class 10 Hanuman',
    subject: 'Chemistry',
    topic: 'Acids, Bases and Salts - pH Scale',
    faculty: 'Dr. Anita Verma',
    resources: [
      { type: 'video', url: 'https://example.com/recording8', title: 'Lab Experiments' },
      { type: 'quiz', url: 'https://example.com/quiz8', title: 'pH Calculations' }
    ]
  },
  {
    id: '9',
    date: '2024-01-20',
    time: '11:00 AM',
    duration: '1h 50m',
    class: 'Class 9',
    batch: 'Class 9 Krishna',
    subject: 'Geography',
    topic: 'Climate - Factors Affecting Climate',
    faculty: 'Mr. Vikram Singh',
    resources: [
      { type: 'video', url: 'https://example.com/recording9', title: 'Climate Maps' },
      { type: 'lms', url: 'https://example.com/lms9', title: 'Case Studies' },
      { type: 'quiz', url: 'https://example.com/quiz9', title: 'Climate Quiz' }
    ]
  },
  {
    id: '10',
    date: '2024-01-19',
    time: '2:30 PM',
    duration: '1h 15m',
    class: 'Class 8',
    batch: 'Class 8 Ganesha',
    subject: 'Mathematics',
    topic: 'Linear Equations - Solving One Variable',
    faculty: 'Ms. Kavitha Reddy',
    resources: [
      { type: 'video', url: 'https://example.com/recording10', title: 'Step-by-step Solutions' },
      { type: 'lms', url: 'https://example.com/lms10', title: 'Practice Sets' }
    ]
  },
  {
    id: '11',
    date: '2024-01-18',
    time: '9:30 AM',
    duration: '1h 30m',
    class: 'Class 10',
    batch: 'Class 10 Hanuman',
    subject: 'English',
    topic: 'Literature - The Merchant of Venice Act 2',
    faculty: 'Ms. Sarah Johnson',
    resources: [
      { type: 'video', url: 'https://example.com/recording11', title: 'Scene Analysis' },
      { type: 'lms', url: 'https://example.com/lms11', title: 'Character Study' },
      { type: 'quiz', url: 'https://example.com/quiz11', title: 'Comprehension Test' }
    ]
  },
  {
    id: '12',
    date: '2024-01-17',
    time: '12:00 PM',
    duration: '1h 40m',
    class: 'Class 9',
    batch: 'Class 9 Disha',
    subject: 'Physics',
    topic: 'Motion - Equations of Motion',
    faculty: 'Prof. Rajesh Kumar',
    resources: [
      { type: 'video', url: 'https://example.com/recording12', title: 'Problem Solving' },
      { type: 'quiz', url: 'https://example.com/quiz12', title: 'Motion Problems' }
    ]
  },
  {
    id: '13',
    date: '2024-01-16',
    time: '3:00 PM',
    duration: '1h 25m',
    class: 'Class 8',
    batch: 'Class 8 Ganesha',
    subject: 'Science',
    topic: 'Sound - Properties of Sound Waves',
    faculty: 'Dr. Ravi Patel',
    resources: [
      { type: 'video', url: 'https://example.com/recording13', title: 'Wave Demonstrations' },
      { type: 'lms', url: 'https://example.com/lms13', title: 'Audio Examples' },
      { type: 'quiz', url: 'https://example.com/quiz13', title: 'Sound Quiz' }
    ]
  },
  {
    id: '14',
    date: '2024-01-15',
    time: '10:45 AM',
    duration: '1h 35m',
    class: 'Class 10',
    batch: 'Class 10 Arjuna',
    subject: 'Social Science',
    topic: 'Democracy - Electoral Politics',
    faculty: 'Prof. Meera Joshi',
    resources: [
      { type: 'video', url: 'https://example.com/recording14', title: 'Election Process' },
      { type: 'lms', url: 'https://example.com/lms14', title: 'Civics Notes' }
    ]
  },
  {
    id: '15',
    date: '2024-01-14',
    time: '1:15 PM',
    duration: '1h 30m',
    class: 'Class 9',
    batch: 'Class 9 Krishna',
    subject: 'Hindi',
    topic: 'व्याकरण - संधि और संधि विच्छेद',
    faculty: 'श्री अमित गुप्ता',
    resources: [
      { type: 'video', url: 'https://example.com/recording15', title: 'व्याकरण सत्र' },
      { type: 'lms', url: 'https://example.com/lms15', title: 'अभ्यास प्रश्न' },
      { type: 'quiz', url: 'https://example.com/quiz15', title: 'संधि परीक्षा' }
    ]
  }
];

export const getUniqueSubjects = (): string[] => {
  const subjects = mockScheduleClasses.map(cls => cls.subject);
  return Array.from(new Set(subjects)).sort();
};

export const getUniqueFaculties = (): string[] => {
  const faculties = mockScheduleClasses.map(cls => cls.faculty);
  return Array.from(new Set(faculties)).sort();
};

export const getUniqueClasses = (): string[] => {
  const classes = mockScheduleClasses.map(cls => cls.class);
  return Array.from(new Set(classes)).sort();
};
