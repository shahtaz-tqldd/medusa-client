import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "rubix";
  size?: "xs" | "sm" | "md";
  role?: "button" | "presentation" | "a";
}

const variantClasses = {
  primary:
    "bg-violet-600/5 text-violet-900 dark:bg-white/10 dark:text-white border-violet-600/15 dark:border-violet-600/30",
  secondary:
    "bg-blue-600/5 text-blue-900 dark:bg-white/10 dark:text-white border-blue-600/15 dark:border-blue-600/30",
  accent:
    "bg-blue-600/5 text-blue-900 dark:bg-white/10 dark:text-white border-blue-600/15 dark:border-blue-600/30",
  rubix:
    "bg-violet-900 dark:bg-white text-white dark:text-violet-900",
};

const sizeClasses = {
  xs: "py-1.5 pr-3 pl-2.5 text-xs",
  sm: "py-2 pr-4 pl-3.5 text-sm",
  md: "py-3 pr-5 pl-4",
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  className = "",
  variant = "primary",
  size="sm",
  role="button"
}) => {
  return (
    <button
      className={cn(
        "rounded-full border flx gap-2",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      role={role}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
};

export default Button;
