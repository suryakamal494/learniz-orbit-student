
import React, { useState } from 'react';
import { BatchExamReport, QuestionAnalysis } from '@/types/batchReport';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StudentPerformanceMatrixProps {
  report: BatchExamReport;
}

export const StudentPerformanceMatrix: React.FC<StudentPerformanceMatrixProps> = ({ report }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const getAnswerStatus = (studentId: string, questionId: string) => {
    const student = report.studentResults.find(s => s.studentId === studentId);
    const answer = student?.answers.find(a => a.questionId === questionId);
    
    if (!answer || answer.selectedOption === null) return 'skipped';
    return answer.isCorrect ? 'correct' : 'wrong';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'wrong': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'skipped': return 'bg-amber-600 hover:bg-amber-700 text-white';
      default: return 'bg-gray-300 hover:bg-gray-400 text-gray-700';
    }
  };

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case 'correct': return '✓';
      case 'wrong': return '✗';
      case 'skipped': return '—';
      default: return '?';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Student Performance Matrix</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Wrong</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-600 rounded"></div>
            <span>Skipped</span>
          </div>
        </div>
      </div>

      <div className="border border-border/40 rounded-lg overflow-auto">
        <div className="min-w-max">
          <TooltipProvider>
            <table className="w-full">
              <thead>
                <tr className="bg-muted/20 border-b border-border/40">
                  <th className="p-3 text-left font-semibold min-w-[120px] sticky left-0 bg-muted/20 z-10">
                    Questions / Students
                  </th>
                  {report.studentResults.map((student) => (
                    <th
                      key={student.studentId}
                      className="p-2 text-center font-medium min-w-[100px] text-sm"
                      title={`${student.studentName} (${student.rollNumber})`}
                    >
                      <div className="truncate">
                        {student.studentName.split(' ')[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {student.percentage.toFixed(0)}%
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.questions.map((question) => (
                  <tr key={question.id} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10 border-r border-border/20">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="flex items-center gap-2 text-left w-full hover:text-primary transition-colors"
                            onClick={() => setSelectedQuestion(selectedQuestion === question.id ? null : question.id)}
                          >
                            <span className="font-semibold">Q{question.questionNumber}</span>
                            <span className="text-sm text-muted-foreground">({question.marks}m)</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-md">
                          <div className="space-y-2">
                            <p className="font-semibold">Question {question.questionNumber}</p>
                            <p>{question.questionText}</p>
                            <div className="space-y-1">
                              {question.options.map((option, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "text-sm p-1 rounded",
                                    index === question.correctAnswer 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-gray-50 text-gray-700"
                                  )}
                                >
                                  {String.fromCharCode(65 + index)}. {option}
                                  {index === question.correctAnswer && " ✓"}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    {report.studentResults.map((student) => {
                      const status = getAnswerStatus(student.studentId, question.id);
                      return (
                        <td key={student.studentId} className="p-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded flex items-center justify-center text-xs font-bold mx-auto transition-colors",
                              getStatusColor(status)
                            )}
                            title={`${student.studentName}: ${status}`}
                          >
                            {getStatusSymbol(status)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </TooltipProvider>
        </div>
      </div>

      {selectedQuestion && (
        <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/40">
          {(() => {
            const question = report.questions.find(q => q.id === selectedQuestion);
            if (!question) return null;
            return (
              <div className="space-y-2">
                <h4 className="font-semibold">Question {question.questionNumber} Details</h4>
                <p className="text-sm">{question.questionText}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-sm p-2 rounded border",
                        index === question.correctAnswer
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-gray-50 border-gray-200 text-gray-700"
                      )}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      {index === question.correctAnswer && (
                        <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
