
import { useState, useMemo, useCallback } from 'react';
import { TeacherScheduleClass, TeacherScheduleFilters, TeacherScheduleSort } from '@/types/teacherSchedule';
import { mockTeacherScheduleClasses } from '@/data/mockTeacherSchedule';

export const useTeacherScheduleData = () => {
  const [filters, setFilters] = useState<TeacherScheduleFilters>({
    search: '',
    dateRange: {},
    class: undefined,
    batch: undefined,
  });

  const [sort, setSort] = useState<TeacherScheduleSort>({
    field: 'date',
    direction: 'desc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    let result = [...mockTeacherScheduleClasses];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(cls => 
        cls.subject.toLowerCase().includes(searchLower) ||
        cls.topic.toLowerCase().includes(searchLower) ||
        cls.class.toLowerCase().includes(searchLower) ||
        cls.batch.toLowerCase().includes(searchLower)
      );
    }

    // Class filter
    if (filters.class) {
      result = result.filter(cls => cls.class === filters.class);
    }

    // Batch filter
    if (filters.batch) {
      result = result.filter(cls => cls.batch === filters.batch);
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

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleFiltersChange = useCallback((newFilters: Partial<TeacherScheduleFilters>) => {
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
      class: undefined,
      batch: undefined,
    });
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  return {
    data: paginatedData,
    filteredData,
    totalItems: sortedData.length,
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
  };
};
