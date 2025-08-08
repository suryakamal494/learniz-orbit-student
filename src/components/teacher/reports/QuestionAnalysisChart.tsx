
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { QuestionAnalysis, BatchExamReport } from '@/types/batchReport';

interface QuestionAnalysisChartProps {
  report: BatchExamReport;
}

export const QuestionAnalysisChart: React.FC<QuestionAnalysisChartProps> = ({ report }) => {
  // Calculate question-wise analysis
  const getQuestionAnalysis = (): QuestionAnalysis[] => {
    return report.questions.map((question) => {
      let correct = 0;
      let wrong = 0;
      let skipped = 0;

      report.studentResults.forEach((student) => {
        const answer = student.answers.find(a => a.questionId === question.id);
        if (!answer || answer.selectedOption === null) {
          skipped++;
        } else if (answer.isCorrect) {
          correct++;
        } else {
          wrong++;
        }
      });

      return {
        questionId: question.id,
        questionNumber: question.questionNumber,
        correct,
        wrong,
        skipped,
        total: correct + wrong + skipped
      };
    });
  };

  const analysisData = getQuestionAnalysis();
  const COLORS = {
    correct: '#22c55e', // green-500
    wrong: '#ef4444',   // red-500
    skipped: '#d97706'  // amber-600
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border/40 rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{`${data.name}: ${data.value} students`}</p>
          <p className="text-sm text-muted-foreground">
            {((data.value / data.total) * 100).toFixed(1)}% of responses
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Question-wise Performance Analysis</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analysisData.map((analysis, index) => {
          const question = report.questions.find(q => q.id === analysis.questionId);
          const chartData = [
            { name: 'Correct', value: analysis.correct, total: analysis.total },
            { name: 'Wrong', value: analysis.wrong, total: analysis.total },
            { name: 'Skipped', value: analysis.skipped, total: analysis.total }
          ].filter(item => item.value > 0);

          return (
            <div key={analysis.questionId} className="bg-muted/20 rounded-lg border border-border/40 p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-base mb-2">
                  Question {analysis.questionNumber} ({question?.marks} marks)
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {question?.questionText}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, entryIndex) => (
                          <Cell 
                            key={`cell-${entryIndex}`} 
                            fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col gap-2">
                  {chartData.map((entry, entryIndex) => (
                    <div key={entryIndex} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: COLORS[entry.name.toLowerCase() as keyof typeof COLORS] }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {entry.value} ({((entry.value / analysis.total) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-border/40">
                    <div className="text-sm font-medium">Total: {analysis.total} students</div>
                    <div className="text-sm text-muted-foreground">
                      Success rate: {((analysis.correct / analysis.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
