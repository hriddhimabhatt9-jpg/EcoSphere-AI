import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component with optional label and error states.
 * @param {InputProps} props - The input properties including label, error, and helperText.
 * @returns {JSX.Element} The rendered input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;

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
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {(error || helperText) && (
          <span 
            id={error ? errorId : undefined}
            className={cn("text-xs", error ? "error-text" : "text-muted")}
            role={error ? "alert" : undefined}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
