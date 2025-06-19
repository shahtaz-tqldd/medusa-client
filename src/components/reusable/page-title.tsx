import React, { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: TitleProps) {
  return (
    <h2 className="text-xl font-semibold">{children}</h2>
  );
}
