import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "rubix" | "nemo";
  size?: "xs" | "sm" | "md";
  role?: "button" | "presentation" | "a";
  onClick?: () => void;
}

const variantClasses = {
  primary:
    "bg-violet-600/5 text-violet-900 dark:bg-white/10 dark:text-white border-violet-600/15 dark:border-violet-600/30",
  secondary:
    "bg-blue-600/5 text-blue-900 dark:bg-white/10 dark:text-white border-blue-600/15 dark:border-blue-600/30",
  accent:
    "bg-blue-600/5 text-blue-900 dark:bg-white/10 dark:text-white border-blue-600/15 dark:border-blue-600/30",
  rubix: "elo-nui",
  nemo: "elo-nui",
};

const sizeClasses = {
  xs: "pb-1.5 pt-2 pr-3 pl-2.5 text-xs",
  sm: "pt-2.5 pb-2 pr-4 pl-3.5 text-sm",
  md: "pt-3 pb-2.5 pr-5 pl-4",
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  className = "",
  variant = "primary",
  size = "sm",
  ...props
}) => {
  const commonClasses = cn(
    "rounded-full border flx gap-2",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (props.role === "presentation") {
    return (
      <span className={commonClasses} {...props}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </span>
    );
  }

  return (
    <button className={commonClasses} {...props}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};

export default Button;
