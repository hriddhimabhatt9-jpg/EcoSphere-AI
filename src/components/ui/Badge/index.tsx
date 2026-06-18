import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "blue" | "amber" | "rose" | "purple" | "default";
  icon?: React.ReactNode;
}

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
        {
          "badge-green": variant === "green",
          "badge-blue": variant === "blue",
          "badge-amber": variant === "amber",
          "badge-rose": variant === "rose",
          "badge-purple": variant === "purple",
          "bg-tertiary text-secondary": variant === "default",
        },
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
