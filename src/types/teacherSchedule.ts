
export interface TeacherScheduleClass {
  id: string;
  date: string;
  time: string;
  duration: string;
  class: string;
  batch: string;
  subject: string;
  topic: string;
  meetingUrl: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherScheduleFilters {
  search: string;
  class?: string;
  batch?: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

export interface TeacherScheduleSort {
  field: 'date' | 'time' | 'class' | 'batch' | 'subject' | 'topic';
  direction: 'asc' | 'desc';
}

export interface AssignmentLink {
  type: 'lms' | 'notes' | 'liveQuiz';
  label: string;
  route: string;
}
