
import React from 'react';
import { DesktopScheduleTable } from './DesktopScheduleTable';
import { MobileScheduleCard } from './MobileScheduleCard';
import { SchedulePagination } from './SchedulePagination';
import { ScheduleClass, ScheduleSort } from '@/types/schedule';

interface ScheduleTableProps {
  data: ScheduleClass[];
  sort: ScheduleSort;
  onSortChange: (field: string) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ScheduleTable({
  data,
  sort,
  onSortChange,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange
}: ScheduleTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 glass rounded-lg border border-border/40">
        <div className="space-y-3">
          <div className="text-4xl" role="img" aria-label="Books">📚</div>
          <h3 className="text-lg font-medium text-foreground">No classes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to find more classes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block w-full">
        <DesktopScheduleTable
          data={data}
          sort={sort}
          onSortChange={onSortChange}
        />
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 w-full">
        {data.map((classItem, index) => (
          <MobileScheduleCard
            key={classItem.id}
            classItem={classItem}
            index={index}
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
