
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
  lines = 1
}) => {
  const baseClasses = "animate-pulse bg-muted/50 rounded";
  
  const variantClasses = {
    text: "h-4",
    rectangular: "h-12",
    circular: "rounded-full aspect-square"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      role="status"
      aria-label="Loading..."
    />
  );
};

export const ScheduleTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Desktop skeleton */}
      <div className="hidden lg:block">
        <div className="glass rounded-lg border border-border/40 overflow-hidden">
          <div className="p-4 bg-muted/20">
            <div className="grid grid-cols-8 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <LoadingSkeleton key={i} variant="text" className="h-6" />
              ))}
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-8 gap-4">
                  {Array.from({ length: 8 }, (_, j) => (
                    <LoadingSkeleton key={j} variant="text" lines={j === 5 ? 2 : 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="lg:hidden space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="glass rounded-lg border border-border/40 p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <LoadingSkeleton variant="text" className="h-6 w-3/4" />
                <LoadingSkeleton variant="text" className="h-4 w-1/2" />
              </div>
              <LoadingSkeleton className="w-16 h-6" />
            </div>
            <LoadingSkeleton variant="text" lines={2} />
            <div className="grid grid-cols-2 gap-4">
              <LoadingSkeleton variant="text" />
              <LoadingSkeleton variant="text" />
            </div>
            <LoadingSkeleton variant="text" />
            <div className="flex gap-2">
              <LoadingSkeleton className="w-20 h-8" />
              <LoadingSkeleton className="w-16 h-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
