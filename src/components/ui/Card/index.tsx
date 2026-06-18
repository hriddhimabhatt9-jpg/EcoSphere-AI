import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass";
}

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
