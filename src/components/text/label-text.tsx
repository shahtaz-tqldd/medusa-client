import React, { ReactNode } from "react";

interface LabelTextProps {
  children: ReactNode;
  icon: React.ComponentType<{ size?: number }>;
  className?: string;
}

export default function LabelText({ children, icon:Icon, className = "" }: LabelTextProps) {
  return (
    <div className={`text-base font-semibold flx gap-2 opacity-90 ${className}`}>
        <Icon size= {16} />
        {children}
    </div>
  );
}
