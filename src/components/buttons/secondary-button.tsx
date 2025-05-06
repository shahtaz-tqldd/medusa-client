import { ReactNode } from "react";
import LordIcon from "@/assets/icons/lord-icon";
import { useTheme } from "next-themes";

interface SecondaryButtonProps {
  children: ReactNode;
  className: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  const { theme } = useTheme();
  return (
    <button className={`flx gap-2 ${className}`} onClick={onClick}>
      <span>{children}</span>
      <LordIcon
        icon="ircnfpus"
        height={18}
        width={18}
        primary={theme === "dark" ? "#fff" : "#000"}
        target="button"
      />
    </button>
  );
};

export default SecondaryButton;
