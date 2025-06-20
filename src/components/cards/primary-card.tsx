import React, { ReactNode } from "react";

interface PrimaryCardProps {
  children: ReactNode;
  className?: string;
}

export default function PrimaryCard({
  children,
  className = "",
}: PrimaryCardProps) {
  return (
    <div
      className={`group relative rounded-2xl p-4 md:p-6 dark:bg-white/[0.03] bg-blue-500/5 border border-dashed border-transparent hover:border-blue-500/20 tr ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 tr bg-blue-500/[0.02] pointer-events-none blur-sm z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
