"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function PrimaryButton({
  children,
  isLoading,
  variant = "primary",
  size = "lg",
  className,
  disabled,
  type = "button",
  onClick,
}: PrimaryButtonProps) {
  const baseStyles = "font-medium rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-nova-primary text-white hover:bg-nova-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "bg-transparent border-2 border-nova-primary text-nova-primary hover:bg-nova-primary hover:text-white",
    ghost: "bg-transparent text-nova-primary hover:bg-nova-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base w-full",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
