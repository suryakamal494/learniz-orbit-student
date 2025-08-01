
import React from 'react';
import { TeacherScheduleHeader } from '@/components/teacher/schedule/TeacherScheduleHeader';
import { TeacherScheduleFilters } from '@/components/teacher/schedule/TeacherScheduleFilters';
import { TeacherScheduleExportBar } from '@/components/teacher/schedule/TeacherScheduleExportBar';
import { TeacherScheduleTable } from '@/components/teacher/schedule/TeacherScheduleTable';
import { useTeacherScheduleData } from '@/hooks/useTeacherScheduleData';

export default function TeacherSchedulePage() {
  const {
    data,
    totalItems,
    filters,
    sort,
    currentPage,
    pageSize,
    totalPages,
    handleFiltersChange,
    handleSortChange,
    clearAllFilters,
    setCurrentPage,
    handlePageSizeChange
  } = useTeacherScheduleData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <TeacherScheduleHeader
            searchQuery={filters.search}
            onSearchChange={(query) => handleFiltersChange({ search: query })}
            totalClasses={totalItems}
          />

          {/* Filters */}
          <TeacherScheduleFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearAll={clearAllFilters}
          />

          {/* Export Bar */}
          <TeacherScheduleExportBar totalItems={totalItems} />

          {/* Table */}
          <TeacherScheduleTable
            data={data}
            sort={sort}
            onSortChange={handleSortChange}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
}
