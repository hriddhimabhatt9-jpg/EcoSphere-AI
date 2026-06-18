"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "btn",
          {
            "btn-primary": variant === "primary",
            "btn-secondary": variant === "secondary",
            "btn-ghost": variant === "ghost",
            "btn-danger": variant === "danger",
            "btn-sm": size === "sm",
            "btn-lg": size === "lg",
            "btn-icon": size === "icon",
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <span className="spinner" style={{ width: 16, height: 16, marginRight: size === "icon" ? 0 : 8 }} />}
        {!isLoading && size === "icon" ? children : isLoading && size === "icon" ? null : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
