import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
}

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function ProgressBar({
  value,
  max = 100,
  color,
  showLabel = false,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-secondary">{value} / {max}</span>
          <span className="font-medium text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            ...(color ? { background: color } : {}),
          }}
        />
      </div>
    </div>
  );
}
