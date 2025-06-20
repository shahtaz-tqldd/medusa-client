import React from "react";
import { cn } from "@/lib/utils"; // utility for combining classNames (optional)

interface CapsuleProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Capsule({
  children,
  variant = "default",
  size = "md",
  className = "",
}: CapsuleProps) {
  const variantStyles: Record<string, string> = {
    default: "bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white",
    primary: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    success:
      "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400",
    danger: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400",
    warning:
      "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "rounded-full center w-fit",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
