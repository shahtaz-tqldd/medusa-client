import { ReactNode } from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

interface LabelTextProps {
  children: ReactNode;
  icon: React.ComponentType<{ size?: number }>;
  variant?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Text = ({ children, className, variant = "md" }: TextProps) => {
  const variants = {
    xs: "text-xs md:text-sm",
    sm: "text-sm md:text-base",
    md: "text-lg md:text-xl",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <p
      className={`text-gray-700 dark:text-gray-300/80 ${variants[variant]} ${className}`}
    >
      {children}
    </p>
  );
};
export const Title = ({ children, className, variant = "md" }: TextProps) => {
  const variants = {
    xs: "text-lg md:text-xl",
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-xl",
  };

  return (
    <h2
      className={`${variants[variant]} leading-[140%] font-medium text-gray-800 dark:text-gray-200 ${className}`}
    >
      {children}
    </h2>
  );
};

export const LabelText = ({
  children,
  icon: Icon,
  variant = "sm",
  className = "",
}: LabelTextProps) => {
  return (
    <Title variant={variant} className={`flx gap-2 ${className}`}>
      <Icon size={18} />
      <span className="flex-1 font-semibold">{children}</span>
    </Title>
  );
};
