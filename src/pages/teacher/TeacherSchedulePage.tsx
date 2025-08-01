
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherScheduleHeader } from '@/components/teacher/schedule/TeacherScheduleHeader';
import { TeacherScheduleFilters } from '@/components/teacher/schedule/TeacherScheduleFilters';
import { TeacherScheduleTable } from '@/components/teacher/schedule/TeacherScheduleTable';
import { ScheduleTableSkeleton } from '@/components/ui/loading-skeleton';
import { useTeacherScheduleData } from '@/hooks/useTeacherScheduleData';
import { toast } from '@/hooks/use-toast';

const TeacherSchedulePage = () => {
  const navigate = useNavigate();
  
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

  const handleCreateClass = () => {
    // TODO: Navigate to create class page when route is defined
    toast({
      title: "Create Class",
      description: "Create class functionality will be implemented soon."
    });
  };

  const handleImportClasses = () => {
    // TODO: Navigate to import page when route is defined
    toast({
      title: "Import Classes",
      description: "Import functionality will be implemented soon."
    });
  };

  const handleExport = (type: 'copy' | 'csv' | 'excel' | 'pdf' | 'print') => {
    toast({
      title: `Export ${type.toUpperCase()}`,
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} export functionality will be implemented soon.`
    });
  };

  const handleSearch = () => {
    // Search is automatically handled by the data hook
    toast({
      title: "Search Applied",
      description: `Found ${totalItems} classes matching your criteria.`
    });
  };

  const handleReset = () => {
    clearAllFilters();
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared."
    });
  };

  const handleEdit = (id: string) => {
    // TODO: Navigate to edit class page when route is defined
    toast({
      title: "Edit Class",
      description: `Edit functionality for class ${id} will be implemented soon.`
    });
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    toast({
      title: "Delete Class",
      description: `Delete functionality for class ${id} will be implemented soon.`,
      variant: "destructive"
    });
  };

  const handleAssignLMS = (id: string) => {
    // TODO: Navigate to assign LMS page when route is defined
    toast({
      title: "Assign LMS",
      description: `LMS assignment for class ${id} will be implemented soon.`
    });
  };

  const handleAssignNotes = (id: string) => {
    // TODO: Navigate to assign notes page when route is defined
    toast({
      title: "Assign Notes",
      description: `Notes assignment for class ${id} will be implemented soon.`
    });
  };

  const handleAssignLiveQuiz = (id: string) => {
    // TODO: Navigate to assign live quiz page when route is defined
    toast({
      title: "Assign Live Quiz",
      description: `Live quiz assignment for class ${id} will be implemented soon.`
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      <TeacherScheduleHeader 
        searchQuery={filters.search}
        onSearchChange={(search) => handleFiltersChange({ search })}
        totalClasses={totalItems}
        onCreateClass={handleCreateClass}
        onImportClasses={handleImportClasses}
        onExport={handleExport}
      />
      
      <TeacherScheduleFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearAll={clearAllFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      
      <main id="main-content" className="w-full max-w-full overflow-hidden">
        <Suspense fallback={<ScheduleTableSkeleton />}>
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssignLMS={handleAssignLMS}
            onAssignNotes={handleAssignNotes}
            onAssignLiveQuiz={handleAssignLiveQuiz}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default TeacherSchedulePage;
