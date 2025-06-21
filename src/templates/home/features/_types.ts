export interface FeatureProps {
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}
export interface SkillProps {
  name: string;
  description: string;
  experience: string;
  progress: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export interface FeatureModalProps {
  data: FeatureProps | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface SkillModalProps {
  data: SkillProps[] | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface FeatureCardProps {
  data: {
    title: string;
    text: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  };
  handleFeatureOpen: (data: FeatureProps) => void;
}
