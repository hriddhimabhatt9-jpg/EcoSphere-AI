import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "blue" | "amber" | "rose" | "purple" | "default";
  icon?: React.ReactNode;
}

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function Badge({
  className,
  variant = "default",
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        variant === "green" && "badge-green",
        variant === "blue" && "badge-blue",
        variant === "amber" && "badge-amber",
        variant === "rose" && "badge-rose",
        variant === "purple" && "badge-purple",
        variant === "default" && "bg-tertiary text-secondary",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
