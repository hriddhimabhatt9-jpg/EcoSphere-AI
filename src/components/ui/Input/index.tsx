import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="input-group">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn("input", { "input-error": !!error }, className)}
          aria-invalid={!!error}
          {...props}
        />
        {(error || helperText) && (
          <span className={cn("text-xs", error ? "error-text" : "text-muted")}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
