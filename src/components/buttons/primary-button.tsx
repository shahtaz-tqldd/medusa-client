import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

const variantClasses = {
  primary:
    "bg-violet-600/5 text-violet-900 dark:bg-white/10 dark:text-white border-violet-600/15 dark:border-violet-600/30",
  secondary:
    "bg-blue-600/5 text-blue-900 dark:bg-white/10 dark:text-white border-blue-600/15 dark:border-blue-600/30",
  accent:
    "bg-emerald-600/5 text-emerald-900 dark:bg-white/10 dark:text-white border-emerald-600/15 dark:border-emerald-600/30",
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      className={cn(
        "py-2 pr-4 pl-3.5 rounded-full border text-sm flex items-center gap-2",
        variantClasses[variant],
        className
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
};

export default Button;
