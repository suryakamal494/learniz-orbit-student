
import { BatchExamReport, ExamQuestion, StudentExamResult, QuestionAnswer } from '@/types/batchReport';

// Sample exam questions
const physicsQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    questionNumber: 1,
    questionText: 'What is the SI unit of electric charge?',
    options: ['Ampere', 'Coulomb', 'Volt', 'Ohm'],
    correctAnswer: 1,
    marks: 2
  },
  {
    id: 'q2',
    questionNumber: 2,
    questionText: 'Which law states that the force between two point charges is directly proportional to the product of their charges?',
    options: ['Ohm\'s Law', 'Coulomb\'s Law', 'Faraday\'s Law', 'Lenz\'s Law'],
    correctAnswer: 1,
    marks: 2
  },
  {
    id: 'q3',
    questionNumber: 3,
    questionText: 'What happens to the resistance of a conductor when its temperature increases?',
    options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero'],
    correctAnswer: 0,
    marks: 2
  },
  {
    id: 'q4',
    questionNumber: 4,
    questionText: 'Which of the following is a vector quantity?',
    options: ['Speed', 'Distance', 'Velocity', 'Time'],
    correctAnswer: 2,
    marks: 2
  },
  {
    id: 'q5',
    questionNumber: 5,
    questionText: 'The dimensional formula for acceleration is:',
    options: ['[M L T⁻²]', '[L T⁻²]', '[M L² T⁻²]', '[M T⁻²]'],
    correctAnswer: 1,
    marks: 2
  }
];

const mathQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    questionNumber: 1,
    questionText: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
    correctAnswer: 0,
    marks: 2
  },
  {
    id: 'q2',
    questionNumber: 2,
    questionText: 'What is the value of ∫(1/x)dx?',
    options: ['x²/2', 'ln|x| + C', '1/x²', 'e^x'],
    correctAnswer: 1,
    marks: 2
  },
  {
    id: 'q3',
    questionNumber: 3,
    questionText: 'What is the sum of angles in a triangle?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    marks: 1
  },
  {
    id: 'q4',
    questionNumber: 4,
    questionText: 'What is the quadratic formula?',
    options: ['x = -b ± √(b²-4ac)/2a', 'x = b ± √(b²+4ac)/2a', 'x = -b ± √(b²+4ac)/2a', 'x = b ± √(b²-4ac)/2a'],
    correctAnswer: 0,
    marks: 3
  },
  {
    id: 'q5',
    questionNumber: 5,
    questionText: 'What is the value of π (pi) approximately?',
    options: ['3.14', '3.141', '3.1416', '3.14159'],
    correctAnswer: 3,
    marks: 1
  }
];

// Helper function to generate student results
const generateStudentResults = (questions: ExamQuestion[], studentNames: string[]): StudentExamResult[] => {
  return studentNames.map((name, index) => {
    const answers: QuestionAnswer[] = questions.map(question => {
      const random = Math.random();
      let selectedOption: number | null;
      let isCorrect: boolean;
      
      if (random < 0.1) { // 10% chance of skipping
        selectedOption = null;
        isCorrect = false;
      } else if (random < 0.7) { // 60% chance of correct answer
        selectedOption = question.correctAnswer;
        isCorrect = true;
      } else { // 30% chance of wrong answer
        selectedOption = (question.correctAnswer + 1) % question.options.length;
        isCorrect = false;
      }
      
      return {
        questionId: question.id,
        selectedOption,
        isCorrect
      };
    });
    
    const score = answers.reduce((total, answer) => {
      const question = questions.find(q => q.id === answer.questionId);
      return total + (answer.isCorrect ? (question?.marks || 0) : 0);
    }, 0);
    
    const totalMarks = questions.reduce((total, question) => total + question.marks, 0);
    const percentage = (score / totalMarks) * 100;
    
    return {
      studentId: `student-${index + 1}`,
      studentName: name,
      rollNumber: `${2024}${String(index + 1).padStart(3, '0')}`,
      answers,
      score,
      totalMarks,
      percentage,
      timeTaken: Math.floor(Math.random() * 30) + 45, // 45-75 minutes
      passed: percentage >= 40
    };
  });
};

const physicsStudents = [
  'Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Sneha Singh', 'Vikram Mehta',
  'Anjali Verma', 'Rohit Gupta', 'Kavya Reddy', 'Amit Joshi', 'Pooja Nair',
  'Sagar Yadav', 'Ritu Agarwal', 'Karan Malhotra', 'Divya Sharma', 'Nikhil Das'
];

const mathStudents = [
  'Aarav Singh', 'Isha Patel', 'Aryan Kumar', 'Anaya Verma', 'Vihaan Sharma',
  'Aanya Gupta', 'Reyansh Joshi', 'Aadhya Nair', 'Kiaan Mehta', 'Myra Singh',
  'Atharv Yadav', 'Pihu Agarwal', 'Vivaan Reddy', 'Saanvi Das', 'Aarush Malhotra'
];

const chemistryStudents = [
  'Arnav Patel', 'Diya Sharma', 'Advait Kumar', 'Avni Singh', 'Ayaan Verma',
  'Khushi Gupta', 'Darsh Joshi', 'Anvi Nair', 'Rudra Mehta', 'Navya Yadav'
];

export const mockBatchReports: BatchExamReport[] = [
  {
    id: 'report-1',
    examId: 'exam-1',
    examTitle: 'Physics Mid-Term Examination',
    batchId: 'batch-1',
    batchName: 'Physics - Grade 12A',
    date: '2024-01-15',
    duration: 120,
    totalMarks: 10,
    totalQuestions: 5,
    averagePerformance: 72.5,
    passPercentage: 86.7,
    studentsAppeared: 15,
    studentsPassed: 13,
    questions: physicsQuestions,
    studentResults: generateStudentResults(physicsQuestions, physicsStudents),
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'report-2',
    examId: 'exam-2',
    examTitle: 'Mathematics Unit Test',
    batchId: 'batch-2',
    batchName: 'Mathematics - Grade 11A',
    date: '2024-01-18',
    duration: 90,
    totalMarks: 9,
    totalQuestions: 5,
    averagePerformance: 68.2,
    passPercentage: 80.0,
    studentsAppeared: 15,
    studentsPassed: 12,
    questions: mathQuestions,
    studentResults: generateStudentResults(mathQuestions, mathStudents),
    createdAt: '2024-01-18T14:00:00Z'
  },
  {
    id: 'report-3',
    examId: 'exam-3',
    examTitle: 'Chemistry Monthly Assessment',
    batchId: 'batch-3',
    batchName: 'Chemistry - Grade 12B',
    date: '2024-01-20',
    duration: 100,
    totalMarks: 10,
    totalQuestions: 5,
    averagePerformance: 75.8,
    passPercentage: 90.0,
    studentsAppeared: 10,
    studentsPassed: 9,
    questions: physicsQuestions, // Reusing for demo
    studentResults: generateStudentResults(physicsQuestions, chemistryStudents),
    createdAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'report-4',
    examId: 'exam-4',
    examTitle: 'Physics Chapter Test - Electricity',
    batchId: 'batch-1',
    batchName: 'Physics - Grade 12A',
    date: '2024-01-25',
    duration: 60,
    totalMarks: 10,
    totalQuestions: 5,
    averagePerformance: 81.2,
    passPercentage: 93.3,
    studentsAppeared: 15,
    studentsPassed: 14,
    questions: physicsQuestions,
    studentResults: generateStudentResults(physicsQuestions, physicsStudents),
    createdAt: '2024-01-25T09:00:00Z'
  },
  {
    id: 'report-5',
    examId: 'exam-5',
    examTitle: 'Mathematics Final Exam',
    batchId: 'batch-2',
    batchName: 'Mathematics - Grade 11A',
    date: '2024-01-28',
    duration: 180,
    totalMarks: 9,
    totalQuestions: 5,
    averagePerformance: 64.5,
    passPercentage: 73.3,
    studentsAppeared: 15,
    studentsPassed: 11,
    questions: mathQuestions,
    studentResults: generateStudentResults(mathQuestions, mathStudents),
    createdAt: '2024-01-28T10:00:00Z'
  }
];

// Helper functions
export const getUniqueBatches = (): string[] => {
  return Array.from(new Set(mockBatchReports.map(report => report.batchName))).sort();
};

export const getBatchReportById = (id: string): BatchExamReport | undefined => {
  return mockBatchReports.find(report => report.id === id);
};

export const getBatchReportsByBatch = (batchName: string): BatchExamReport[] => {
  return mockBatchReports.filter(report => report.batchName === batchName);
};
