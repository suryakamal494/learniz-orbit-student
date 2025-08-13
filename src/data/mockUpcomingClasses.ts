
export interface UpcomingClass {
  id: string
  time: string
  date: string
  batch: string
  class: string
  topic: string
  subject: string
  streamingLink?: string
  hasAnimations: boolean
  hasFacultyNotes: boolean
  hasLiveQuiz: boolean
  isLive: boolean
  duration: string
  studentsCount: number
}

export const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: "1",
    time: "09:00 AM",
    date: "2024-08-13",
    batch: "JEE Advanced 2025",
    class: "Class 12",
    topic: "Calculus - Applications of Derivatives",
    subject: "Mathematics",
    streamingLink: "https://meet.google.com/abc-defg-hij",
    hasAnimations: true,
    hasFacultyNotes: false,
    hasLiveQuiz: true,
    isLive: true,
    duration: "90 min",
    studentsCount: 45
  },
  {
    id: "2",
    time: "11:30 AM",
    date: "2024-08-13",
    batch: "NEET 2025",
    class: "Class 12",
    topic: "Chemical Bonding and Molecular Structure",
    subject: "Chemistry",
    streamingLink: "https://meet.google.com/xyz-uvwx-yz",
    hasAnimations: false,
    hasFacultyNotes: true,
    hasLiveQuiz: false,
    isLive: false,
    duration: "75 min",
    studentsCount: 38
  },
  {
    id: "3",
    time: "02:00 PM",
    date: "2024-08-13",
    batch: "Foundation Course",
    class: "Class 11",
    topic: "Electromagnetic Induction",
    subject: "Physics",
    hasAnimations: false,
    hasFacultyNotes: false,
    hasLiveQuiz: true,
    isLive: false,
    duration: "60 min",
    studentsCount: 52
  },
  {
    id: "4",
    time: "04:30 PM",
    date: "2024-08-13",
    batch: "JEE Main 2025",
    class: "Class 12",
    topic: "Coordination Compounds",
    subject: "Chemistry",
    streamingLink: "https://meet.google.com/def-ghi-jkl",
    hasAnimations: true,
    hasFacultyNotes: true,
    hasLiveQuiz: false,
    isLive: false,
    duration: "90 min",
    studentsCount: 41
  },
  {
    id: "5",
    time: "06:00 PM",
    date: "2024-08-13",
    batch: "NEET Biology",
    class: "Class 12",
    topic: "Genetics and Evolution",
    subject: "Biology",
    hasAnimations: false,
    hasFacultyNotes: true,
    hasLiveQuiz: true,
    isLive: false,
    duration: "75 min",
    studentsCount: 33
  }
]
