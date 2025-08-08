
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Clock, Calendar, BookOpen, Target } from 'lucide-react';
import { getBatchReportById } from '@/data/mockBatchReports';
import { BatchExamReport } from '@/types/batchReport';
import { StudentPerformanceMatrix } from '@/components/teacher/reports/StudentPerformanceMatrix';
import { QuestionAnalysisChart } from '@/components/teacher/reports/QuestionAnalysisChart';
import { format } from 'date-fns';

const DetailedExamReportPage = () => {
  const { batchId, examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get report from location state first, then from mock data
  const report: BatchExamReport | undefined = location.state?.report || 
    (examId ? getBatchReportById(examId) : undefined);

  if (!report) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50 mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Report Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The exam report you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/teacher/reports/batch')}>
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/teacher/reports/batch')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{report.examTitle}</h1>
          <p className="text-muted-foreground">Detailed performance analysis</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {report.batchName}
        </Badge>
      </div>

      {/* Exam Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {format(new Date(report.date), 'MMM dd')}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(report.date), 'yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{report.duration}</div>
            <p className="text-xs text-muted-foreground">minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{report.studentsAppeared}</div>
            <p className="text-xs text-muted-foreground">appeared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{report.totalQuestions}</div>
            <p className="text-xs text-muted-foreground">{report.totalMarks} marks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">
              {report.averagePerformance.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-600">
              {report.passPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {report.studentsPassed} passed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Student Performance Matrix</CardTitle>
          <p className="text-sm text-muted-foreground">
            Hover over question numbers to see full questions. Click to expand details below.
          </p>
        </CardHeader>
        <CardContent>
          <StudentPerformanceMatrix report={report} />
        </CardContent>
      </Card>

      {/* Question Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Question-wise Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Performance breakdown for each question with visual distribution
          </p>
        </CardHeader>
        <CardContent>
          <QuestionAnalysisChart report={report} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedExamReportPage;
