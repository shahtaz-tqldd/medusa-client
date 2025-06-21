import React from "react";

interface IconButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  size?: number;
  className?: string;
}

export default function IconButton({
  icon: Icon,
  size = 16,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`h-8 w-8 center rounded-full bg-blue-500/5 dark:bg-white/5 dark:hover:bg-white/10 hover:bg-blue-600/10 tr ${className}`}
    >
      <Icon size={size} />
    </button>
  );
}
