import React, { ReactNode } from "react";

interface TitleTextProps {
  children: ReactNode;
  icon: React.ComponentType<{ strokeWidth?: number; className?: string }>;
  className?: string;
}

export default function TitleText({ children, icon: Icon, className = "" }: TitleTextProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div className="bg-blue-500/10 dark:bg-white/5 p-2 rounded-xl">
        <Icon className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-medium dark:text-gray-200 text-slate-800">
        {children}
      </h2>
    </div>
  );
}
