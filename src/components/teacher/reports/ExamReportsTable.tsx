
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, Clock, Calendar } from 'lucide-react';
import { BatchExamReport } from '@/types/batchReport';
import { format } from 'date-fns';

interface ExamReportsTableProps {
  reports: BatchExamReport[];
  onViewReport: (report: BatchExamReport) => void;
}

export const ExamReportsTable: React.FC<ExamReportsTableProps> = ({
  reports,
  onViewReport
}) => {
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPassColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50 mb-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Found</h3>
        <p className="text-muted-foreground max-w-md">
          No exam reports match your current filters. Try adjusting the batch or date range.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/40 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Batch
                </div>
              </TableHead>
              <TableHead className="font-semibold">Exam Title</TableHead>
              <TableHead className="font-semibold text-center">Avg Performance</TableHead>
              <TableHead className="font-semibold text-center">Pass Percentage</TableHead>
              <TableHead className="font-semibold text-center">Students</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="font-medium">
                    {format(new Date(report.date), 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {report.duration}min
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {report.batchName}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{report.examTitle}</div>
                  <div className="text-sm text-muted-foreground">
                    {report.totalQuestions} questions • {report.totalMarks} marks
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getPerformanceColor(report.averagePerformance)}>
                    {report.averagePerformance.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getPassColor(report.passPercentage)}>
                    {report.passPercentage.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-sm">
                    <div className="font-medium">{report.studentsAppeared}</div>
                    <div className="text-muted-foreground">appeared</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewReport(report)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-background border border-border/40 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{report.examTitle}</h3>
                <Badge variant="outline" className="mt-1">
                  {report.batchName}
                </Badge>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                {format(new Date(report.date), 'MMM dd, yyyy')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
                <Badge className={getPerformanceColor(report.averagePerformance)}>
                  {report.averagePerformance.toFixed(1)}%
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pass Rate</div>
                <Badge className={getPassColor(report.passPercentage)}>
                  {report.passPercentage.toFixed(1)}%
                </Badge>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border/40">
              <div className="text-sm text-muted-foreground">
                {report.studentsAppeared} students • {report.duration}min • {report.totalMarks} marks
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewReport(report)}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
