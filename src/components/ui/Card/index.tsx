import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass";
}

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "card",
        {
          "card-elevated": variant === "elevated",
          "card-glass": variant === "glass",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
