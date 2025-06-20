import React, { ReactNode } from "react";

interface BodyTextProps {
  children: ReactNode;
  className?: string;
}

export default function BodyText({ children, className = "" }: BodyTextProps) {
  return (
    <p className={`text-slate-600 dark:text-gray-400 leading-relaxed ${className}`}>
        {children}
    </p>
  );
}
