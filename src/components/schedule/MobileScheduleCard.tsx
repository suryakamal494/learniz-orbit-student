
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ResourceLinks } from './ResourceLinks';
import { ScheduleClass } from '@/types/schedule';
import { format, parseISO } from 'date-fns';

interface MobileScheduleCardProps {
  classItem: ScheduleClass;
  index: number;
}

export const MobileScheduleCard: React.FC<MobileScheduleCardProps> = ({ 
  classItem, 
  index 
}) => {
  return (
    <Card 
      className="glass border border-border/40 animate-fade-in w-full overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-semibold text-primary text-lg truncate">
              {classItem.subject}
            </h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(classItem.date), 'MMM dd, yyyy')} • {classItem.time}
            </p>
          </div>
          <div className="text-xs bg-muted/50 px-2 py-1 rounded shrink-0">
            {classItem.duration}
          </div>
        </div>

        <div className="text-sm line-clamp-2 text-foreground">
          {classItem.topic}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="min-w-0">
            <div className="text-muted-foreground mb-1">Class</div>
            <div className="font-medium truncate">{classItem.class}</div>
          </div>
          <div className="min-w-0">
            <div className="text-muted-foreground mb-1">Batch</div>
            <div className="font-medium truncate">{classItem.batch}</div>
          </div>
        </div>

        <div>
          <div className="text-muted-foreground text-sm mb-1">Faculty</div>
          <div className="font-medium truncate">{classItem.faculty}</div>
        </div>

        <div>
          <div className="text-muted-foreground text-sm mb-2">Resources</div>
          <ResourceLinks resources={classItem.resources} isMobile />
        </div>
      </CardContent>
    </Card>
  );
};
