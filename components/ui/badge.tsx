import React, { ReactNode } from "react";
import { Text } from "./typography";

const TechBadge = ({
  children,
  color = "dark:!text-emerald-500 !text-emerald-600 dark:bg-emerald-100/5 bg-emerald-500/5",
}: {
  children: ReactNode;
  color?: string;
}) => {
  return (
    <Text
      variant="xs"
      className={`py-1.5 px-3.5 w-fit capitalize rounded-full font-semibold ${color}`}
    >
      {children}
    </Text>
  );
};

export default TechBadge;
