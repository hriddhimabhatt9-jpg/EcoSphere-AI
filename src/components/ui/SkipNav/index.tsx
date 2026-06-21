import React from "react";
import { cn } from "@/lib/utils";

export interface SkipNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

/**
 * SkipNav — Accessibility component to allow screen readers to skip directly to main content.
 * Invisible by default, becomes visible when focused via keyboard navigation.
 * @param {SkipNavProps} props - Component properties
 * @returns {JSX.Element} The skip navigation link
 */
export function SkipNav({ targetId = "main-content", className, ...props }: SkipNavProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-green focus:text-bg-primary focus:rounded-md focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green",
        className
      )}
      {...props}
    >
      Skip to main content
    </a>
  );
}
