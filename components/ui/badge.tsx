import React, { ReactNode } from "react";
import { Text } from "./typography";

const TechBadge = ({
  children,
  color = "dark:!text-emerald-500 !text-emerald-600",
}: {
  children: ReactNode;
  color?: string;
}) => {
  return (
    <div className="py-1 px-3.5 rounded-full dark:bg-emerald-100/5 bg-emerald-500/5">
      <Text variant="xs" className={`font-semibold ${color}`}>
        {children}
      </Text>
    </div>
  );
};

export default TechBadge;
