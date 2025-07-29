
import { Message, Faculty, MessageThread } from "@/types/messages"

export const mockFaculty: Faculty[] = [
  {
    id: "faculty-1",
    name: "Dr. Sarah Johnson",
    department: "Mathematics",
    email: "sarah.johnson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    id: "faculty-2", 
    name: "Prof. Michael Chen",
    department: "Computer Science",
    email: "michael.chen@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
  },
  {
    id: "faculty-3",
    name: "Dr. Emily Rodriguez",
    department: "Physics",
    email: "emily.rodriguez@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
  },
  {
    id: "faculty-4",
    name: "Prof. David Wilson",
    department: "Chemistry",
    email: "david.wilson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
  },
  {
    id: "faculty-5",
    name: "Dr. Lisa Park",
    department: "Biology",
    email: "lisa.park@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
  }
]

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "faculty-1",
    recipientId: "student-1",
    subject: "Assignment 3 Feedback",
    body: "Great work on your calculus assignment! Your approach to solving the integration problems was very methodical. However, I noticed a small error in problem 4. Please review the chain rule application.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    threadId: "thread-1"
  },
  {
    id: "msg-2", 
    senderId: "faculty-2",
    recipientId: "student-1",
    subject: "Project Proposal Review",
    body: "I've reviewed your project proposal for the web development course. The concept is interesting, but I'd like to discuss the technical implementation details. Are you available for office hours this week?",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    threadId: "thread-2"
  },
  {
    id: "msg-3",
    senderId: "faculty-3",
    recipientId: "student-1", 
    subject: "Lab Report Submission",
    body: "Your lab report on quantum mechanics was submitted successfully. I'll have it graded by Friday. Remember to include more detailed calculations in your analysis section for future reports.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    threadId: "thread-3"
  },
  {
    id: "msg-4",
    senderId: "faculty-4",
    recipientId: "student-1",
    subject: "Midterm Exam Schedule",
    body: "The midterm exam for Organic Chemistry has been scheduled for next Tuesday at 2 PM in Room 101. Please review chapters 5-8 and practice the synthesis problems we covered in class.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: false,
    threadId: "thread-4"
  },
  {
    id: "msg-5",
    senderId: "faculty-5",
    recipientId: "student-1",
    subject: "Research Opportunity",
    body: "I have an exciting research opportunity in molecular biology that might interest you. It involves studying protein interactions using advanced microscopy techniques. Would you like to discuss this further?",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isRead: true,
    threadId: "thread-5"
  }
]

export const mockThreads: MessageThread[] = [
  {
    id: "thread-1",
    participants: ["faculty-1", "student-1"],
    messages: [
      {
        id: "msg-1",
        senderId: "faculty-1",
        recipientId: "student-1",
        subject: "Assignment 3 Feedback",
        body: "Great work on your calculus assignment! Your approach to solving the integration problems was very methodical. However, I noticed a small error in problem 4. Please review the chain rule application.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        threadId: "thread-1"
      },
      {
        id: "msg-1-reply",
        senderId: "student-1",
        recipientId: "faculty-1",
        subject: "Re: Assignment 3 Feedback",
        body: "Thank you for the feedback, Dr. Johnson! I'll review problem 4 and resubmit it by tomorrow. Could you also clarify the approach for problem 7?",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true,
        threadId: "thread-1"
      }
    ],
    lastMessage: {
      id: "msg-1-reply",
      senderId: "student-1",
      recipientId: "faculty-1",
      subject: "Re: Assignment 3 Feedback",
      body: "Thank you for the feedback, Dr. Johnson! I'll review problem 4 and resubmit it by tomorrow. Could you also clarify the approach for problem 7?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true,
      threadId: "thread-1"
    },
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "thread-2",
    participants: ["faculty-2", "student-1"],
    messages: [
      {
        id: "msg-2",
        senderId: "faculty-2",
        recipientId: "student-1",
        subject: "Project Proposal Review",
        body: "I've reviewed your project proposal for the web development course. The concept is interesting, but I'd like to discuss the technical implementation details. Are you available for office hours this week?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isRead: true,
        threadId: "thread-2"
      }
    ],
    lastMessage: {
      id: "msg-2",
      senderId: "faculty-2",
      recipientId: "student-1",
      subject: "Project Proposal Review",
      body: "I've reviewed your project proposal for the web development course. The concept is interesting, but I'd like to discuss the technical implementation details. Are you available for office hours this week?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: true,
      threadId: "thread-2"
    },
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: "thread-3",
    participants: ["faculty-3", "student-1"],
    messages: [
      {
        id: "msg-3",
        senderId: "faculty-3",
        recipientId: "student-1",
        subject: "Lab Report Submission",
        body: "Your lab report on quantum mechanics was submitted successfully. I'll have it graded by Friday. Remember to include more detailed calculations in your analysis section for future reports.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isRead: true,
        threadId: "thread-3"
      }
    ],
    lastMessage: {
      id: "msg-3",
      senderId: "faculty-3",
      recipientId: "student-1",
      subject: "Lab Report Submission",
      body: "Your lab report on quantum mechanics was submitted successfully. I'll have it graded by Friday. Remember to include more detailed calculations in your analysis section for future reports.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true,
      threadId: "thread-3"
    },
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "thread-4",
    participants: ["faculty-4", "student-1"],
    messages: [
      {
        id: "msg-4",
        senderId: "faculty-4",
        recipientId: "student-1",
        subject: "Midterm Exam Schedule",
        body: "The midterm exam for Organic Chemistry has been scheduled for next Tuesday at 2 PM in Room 101. Please review chapters 5-8 and practice the synthesis problems we covered in class.",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isRead: false,
        threadId: "thread-4"
      }
    ],
    lastMessage: {
      id: "msg-4",
      senderId: "faculty-4",
      recipientId: "student-1",
      subject: "Midterm Exam Schedule",
      body: "The midterm exam for Organic Chemistry has been scheduled for next Tuesday at 2 PM in Room 101. Please review chapters 5-8 and practice the synthesis problems we covered in class.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isRead: false,
      threadId: "thread-4"
    },
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: "thread-5",
    participants: ["faculty-5", "student-1"],
    messages: [
      {
        id: "msg-5",
        senderId: "faculty-5",
        recipientId: "student-1",
        subject: "Research Opportunity",
        body: "I have an exciting research opportunity in molecular biology that might interest you. It involves studying protein interactions using advanced microscopy techniques. Would you like to discuss this further?",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isRead: true,
        threadId: "thread-5"
      }
    ],
    lastMessage: {
      id: "msg-5",
      senderId: "faculty-5",
      recipientId: "student-1",
      subject: "Research Opportunity",
      body: "I have an exciting research opportunity in molecular biology that might interest you. It involves studying protein interactions using advanced microscopy techniques. Would you like to discuss this further?",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isRead: true,
      threadId: "thread-5"
    },
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
]
