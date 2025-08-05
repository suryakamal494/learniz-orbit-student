
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Download } from 'lucide-react';
import { AttendanceRecord } from '@/data/mockAttendanceData';

interface AttendanceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: AttendanceRecord | null;
}

export function AttendanceDetailModal({ open, onOpenChange, record }: AttendanceDetailModalProps) {
  if (!record) return null;

  const attendanceRate = Math.round((record.presentStudents / record.totalStudents) * 100);

  const handleExport = () => {
    const data = {
      classTitle: record.classTitle,
      batch: record.batch,
      date: record.date,
      time: record.time,
      presentStudents: record.presentStudentsList,
      absentStudents: record.absentStudentsList
    };
    
    console.log('Exporting attendance data:', data);
    // Here you would implement actual export functionality
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                {record.classTitle} - Attendance Details
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{record.batch}</span>
                <span>•</span>
                <span>{record.date} at {record.time}</span>
                <Badge variant={attendanceRate >= 80 ? 'default' : 'secondary'} className="ml-2">
                  {attendanceRate}% Attendance
                </Badge>
              </div>
            </div>
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Present Students */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium text-green-700">
                Present Students ({record.presentStudents})
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              {record.presentStudentsList.length > 0 ? (
                <div className="space-y-2">
                  {record.presentStudentsList.map((student, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{student}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-green-600 text-center py-4">No students present</p>
              )}
            </div>
          </div>

          {/* Absent Students */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-medium text-red-700">
                Absent Students ({record.absentStudents})
              </h3>
            </div>
            <div className="bg-red-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              {record.absentStudentsList.length > 0 ? (
                <div className="space-y-2">
                  {record.absentStudentsList.map((student, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">{student}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-600 text-center py-4">No students absent</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{record.totalStudents}</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{record.presentStudents}</div>
            <div className="text-sm text-muted-foreground">Present</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{record.absentStudents}</div>
            <div className="text-sm text-muted-foreground">Absent</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
