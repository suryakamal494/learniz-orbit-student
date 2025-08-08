
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockBatchReports, getUniqueBatches } from '@/data/mockBatchReports';
import { BatchReportFilters, BatchExamReport } from '@/types/batchReport';
import { ReportFilters } from '@/components/teacher/reports/ReportFilters';
import { ExamReportsTable } from '@/components/teacher/reports/ExamReportsTable';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function BatchReportsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BatchReportFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const batches = useMemo(() => getUniqueBatches(), []);

  // Filter reports based on current filters
  const filteredReports = useMemo(() => {
    let result = [...mockBatchReports];

    // Batch filter
    if (filters.batch) {
      result = result.filter(report => report.batchName === filters.batch);
    }

    // Date range filter
    if (filters.dateRange?.from || filters.dateRange?.to) {
      result = result.filter(report => {
        const reportDate = new Date(report.date);
        if (filters.dateRange?.from && reportDate < filters.dateRange.from) return false;
        if (filters.dateRange?.to && reportDate > filters.dateRange.to) return false;
        return true;
      });
    }

    // Sort by date (most recent first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filters]);

  // Paginate results
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredReports.slice(startIndex, startIndex + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const handleFiltersChange = (newFilters: Partial<BatchReportFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleViewReport = (report: BatchExamReport) => {
    navigate(`/teacher/reports/batch/${report.batchId}/exam/${report.examId}`, {
      state: { report }
    });
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (filteredReports.length === 0) return null;
    
    const totalExams = filteredReports.length;
    const avgPerformance = filteredReports.reduce((sum, report) => sum + report.averagePerformance, 0) / totalExams;
    const avgPassRate = filteredReports.reduce((sum, report) => sum + report.passPercentage, 0) / totalExams;
    const totalStudents = filteredReports.reduce((sum, report) => sum + report.studentsAppeared, 0);

    return {
      totalExams,
      avgPerformance,
      avgPassRate,
      totalStudents
    };
  }, [filteredReports]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Batch Reports</h1>
          <p className="text-muted-foreground">Comprehensive exam performance analytics for all batches</p>
        </div>
        <Button onClick={() => navigate('/teacher/reports')} variant="outline">
          Back to Reports
        </Button>
      </div>

      {/* Summary Stats */}
      {summaryStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalExams}</div>
              <p className="text-xs text-muted-foreground">Exam reports available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.avgPerformance.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Across all filtered exams</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Pass Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.avgPassRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Students passing exams</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Exam attempts</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={clearAllFilters}
        batches={batches}
      />

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Exam Reports
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ExamReportsTable
            reports={paginatedReports}
            onViewReport={handleViewReport}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
