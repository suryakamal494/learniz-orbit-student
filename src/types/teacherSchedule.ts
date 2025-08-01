
export interface TeacherScheduleResource {
  type: 'video' | 'lms' | 'quiz' | 'document';
  url: string;
  title: string;
}

export interface TeacherScheduleClass {
  id: string;
  date: string;
  time: string;
  duration: string;
  class: string;
  batch: string;
  subject: string;
  topic: string;
  faculty: string;
  resources: TeacherScheduleResource[];
  urlView?: string;
  assignedLMS?: boolean;
  assignedNotes?: boolean;
  assignedLiveQuiz?: boolean;
}

export interface TeacherScheduleFilters {
  search: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  subject?: string;
  class?: string;
  batch?: string;
}

export type TeacherSortField = 'date' | 'time' | 'class' | 'batch' | 'subject' | 'topic' | 'faculty';
export type TeacherSortDirection = 'asc' | 'desc';

export interface TeacherScheduleSort {
  field: TeacherSortField;
  direction: TeacherSortDirection;
}
