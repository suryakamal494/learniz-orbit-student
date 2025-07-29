
import React, { Suspense } from 'react';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { ScheduleFilters } from '@/components/schedule/ScheduleFilters';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { ScheduleTableSkeleton } from '@/components/ui/loading-skeleton';
import { useScheduleData } from '@/hooks/useScheduleData';

const SchedulePage = () => {
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
  } = useScheduleData();

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      <ScheduleHeader 
        searchQuery={filters.search}
        onSearchChange={(search) => handleFiltersChange({ search })}
        totalClasses={totalItems}
      />
      
      <ScheduleFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearAll={clearAllFilters}
      />
      
      <main id="main-content" className="w-full max-w-full overflow-hidden">
        <Suspense fallback={<ScheduleTableSkeleton />}>
          <ScheduleTable
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
        </Suspense>
      </main>
    </div>
  );
};

export default SchedulePage;
