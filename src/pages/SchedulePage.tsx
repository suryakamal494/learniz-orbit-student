
import { useState, useMemo } from 'react';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { ScheduleFilters } from '@/components/schedule/ScheduleFilters';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { mockScheduleClasses } from '@/data/mockSchedule';
import { ScheduleClass, ScheduleFilters as ScheduleFiltersType, ScheduleSort } from '@/types/schedule';

const SchedulePage = () => {
  const [filters, setFilters] = useState<ScheduleFiltersType>({
    search: '',
    dateRange: {},
    subject: undefined,
    faculty: undefined,
    class: undefined,
  });

  const [sort, setSort] = useState<ScheduleSort>({
    field: 'date',
    direction: 'desc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = [...mockScheduleClasses];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(cls => 
        cls.subject.toLowerCase().includes(searchLower) ||
        cls.topic.toLowerCase().includes(searchLower) ||
        cls.faculty.toLowerCase().includes(searchLower) ||
        cls.class.toLowerCase().includes(searchLower) ||
        cls.batch.toLowerCase().includes(searchLower)
      );
    }

    // Subject filter
    if (filters.subject) {
      result = result.filter(cls => cls.subject === filters.subject);
    }

    // Faculty filter
    if (filters.faculty) {
      result = result.filter(cls => cls.faculty === filters.faculty);
    }

    // Class filter
    if (filters.class) {
      result = result.filter(cls => cls.class === filters.class);
    }

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      result = result.filter(cls => {
        const classDate = new Date(cls.date);
        if (filters.dateRange.from && classDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && classDate > filters.dateRange.to) return false;
        return true;
      });
    }

    return result;
  }, [filters]);

  // Sort logic
  const sortedData = useMemo(() => {
    const result = [...filteredData];
    
    return result.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      if (sort.field === 'date') {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else {
        aValue = a[sort.field] as string;
        bValue = b[sort.field] as string;
      }

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sort.direction === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, sort]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleFiltersChange = (newFilters: Partial<ScheduleFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleSortChange = (field: string) => {
    setSort(prev => ({
      field: field as any,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      dateRange: {},
      subject: undefined,
      faculty: undefined,
      class: undefined,
    });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      <ScheduleHeader 
        searchQuery={filters.search}
        onSearchChange={(search) => handleFiltersChange({ search })}
        totalClasses={sortedData.length}
      />
      
      <ScheduleFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearAll={clearAllFilters}
      />
      
      <div className="w-full max-w-full overflow-hidden">
        <ScheduleTable
          data={paginatedData}
          sort={sort}
          onSortChange={handleSortChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={sortedData.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
