
import React from 'react';
import { TeacherDesktopScheduleTable } from './TeacherDesktopScheduleTable';
import { TeacherMobileScheduleCard } from './TeacherMobileScheduleCard';
import { SchedulePagination } from '@/components/schedule/SchedulePagination';
import { TeacherScheduleClass, TeacherScheduleSort } from '@/types/teacherSchedule';

interface TeacherScheduleTableProps {
  data: TeacherScheduleClass[];
  sort: TeacherScheduleSort;
  onSortChange: (field: string) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignLMS: (id: string) => void;
  onAssignNotes: (id: string) => void;
  onAssignLiveQuiz: (id: string) => void;
}

export function TeacherScheduleTable({
  data,
  sort,
  onSortChange,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onAssignLMS,
  onAssignNotes,
  onAssignLiveQuiz
}: TeacherScheduleTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 glass rounded-lg border border-border/40">
        <div className="space-y-3">
          <div className="text-4xl" role="img" aria-label="Calendar">📅</div>
          <h3 className="text-lg font-medium text-foreground">No classes scheduled</h3>
          <p className="text-muted-foreground">
            Create your first class or adjust your search criteria to find existing classes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block w-full">
        <TeacherDesktopScheduleTable
          data={data}
          sort={sort}
          onSortChange={onSortChange}
          onEdit={onEdit}
          onDelete={onDelete}
          onAssignLMS={onAssignLMS}
          onAssignNotes={onAssignNotes}
          onAssignLiveQuiz={onAssignLiveQuiz}
        />
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 w-full">
        {data.map((classItem, index) => (
          <TeacherMobileScheduleCard
            key={classItem.id}
            classItem={classItem}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            onAssignLMS={onAssignLMS}
            onAssignNotes={onAssignNotes}
            onAssignLiveQuiz={onAssignLiveQuiz}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <SchedulePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
