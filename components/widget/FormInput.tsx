"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-4">
        {label && (
          <label className="block text-[16px] font-medium text-nova-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-4 text-[16px] font-normal bg-white border border-nova-border rounded-[30px]",
            "placeholder:text-nova-text-muted",
            "focus:outline-none focus:ring-1 focus:ring-nova-primary/20 focus:border-nova-primary/30",
            "transition-all duration-200",
            error && "border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-nova-text-muted">{helperText}</p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
