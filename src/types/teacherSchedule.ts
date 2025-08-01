
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
  assignments: {
    urlView?: string;
    lmsAssigned: boolean;
    notesAssigned: boolean;
    liveQuizAssigned: boolean;
  };
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface TeacherScheduleFilters {
  search: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  class?: string;
  batch?: string;
}

export type TeacherScheduleSortField = 'date' | 'time' | 'class' | 'batch' | 'subject' | 'topic' | 'faculty';
export type SortDirection = 'asc' | 'desc';

export interface TeacherScheduleSort {
  field: TeacherScheduleSortField;
  direction: SortDirection;
}

export interface TeacherScheduleData {
  classes: TeacherScheduleClass[];
  totalCount: number;
}
