
import { useState, useMemo, useCallback } from 'react';
import { ScheduleClass, ScheduleFilters, ScheduleSort } from '@/types/schedule';
import { mockScheduleClasses } from '@/data/mockSchedule';

export const useScheduleData = () => {
  const [filters, setFilters] = useState<ScheduleFilters>({
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

  // Memoized filter function
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

  // Memoized sort function
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

  // Memoized pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Callback functions
  const handleFiltersChange = useCallback((newFilters: Partial<ScheduleFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((field: string) => {
    setSort(prev => ({
      field: field as any,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: '',
      dateRange: {},
      subject: undefined,
      faculty: undefined,
      class: undefined,
    });
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  return {
    // Data
    data: paginatedData,
    filteredData,
    totalItems: sortedData.length,
    
    // State
    filters,
    sort,
    currentPage,
    pageSize,
    totalPages,
    
    // Actions
    handleFiltersChange,
    handleSortChange,
    clearAllFilters,
    setCurrentPage,
    handlePageSizeChange
  };
};
