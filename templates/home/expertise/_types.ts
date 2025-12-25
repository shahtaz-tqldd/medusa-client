import type { LucideIcon } from "lucide-react";

export interface ExpertiseProject {
  name: string;
  description: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  icon: LucideIcon;
  img: string;
  description: string;
  keyPoints: string[];
  projects: ExpertiseProject[];
  experience: string;
  technologies: string[];
}

export interface FeatureDetailsDrawerProps {
  data: ExpertiseArea | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
