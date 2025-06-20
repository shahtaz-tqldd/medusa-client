import React, { ReactNode } from "react";
import { ChevronRightIcon } from "lucide-react";

interface TextButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export default function TextButton({
  children,
  onClick,
  className = "",
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-medium dark:text-blue-400 text-gray-900 hover:dark:text-white hover:text-blue-600 tr group/btn flx gap-1.5 ${className}`}
    >
      {children}
      <ChevronRightIcon
        size={16}
        className="group-hover/btn:translate-x-1 tr"
      />
    </button>
  );
}
