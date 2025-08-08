
export interface QuestionAnswer {
  questionId: string;
  selectedOption: number | null; // null means skipped
  isCorrect: boolean;
}

export interface StudentExamResult {
  studentId: string;
  studentName: string;
  rollNumber: string;
  answers: QuestionAnswer[];
  score: number;
  totalMarks: number;
  percentage: number;
  timeTaken: number; // in minutes
  passed: boolean;
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

export interface QuestionAnalysis {
  questionId: string;
  questionNumber: number;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
}

export interface BatchExamReport {
  id: string;
  examId: string;
  examTitle: string;
  batchId: string;
  batchName: string;
  date: string;
  duration: number; // in minutes
  totalMarks: number;
  totalQuestions: number;
  averagePerformance: number; // percentage
  passPercentage: number;
  studentsAppeared: number;
  studentsPassed: number;
  questions: ExamQuestion[];
  studentResults: StudentExamResult[];
  createdAt: string;
}

export interface BatchReportFilters {
  batch?: string;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

export interface BatchReportSort {
  field: 'date' | 'examTitle' | 'batchName' | 'averagePerformance' | 'passPercentage';
  direction: 'asc' | 'desc';
}
