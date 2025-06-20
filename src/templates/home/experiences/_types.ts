export interface ExperienceProps {
  id: number;
  timeline: string;
  position: string;
  company: string;
  companyColor: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  status: string;
  duration: string;
  type: string;
  location: string;
  technologies: string[];
  achievements: string[];
  description: string;
  highlights: string[];
}

export interface ExperienceModalProps {
  data: ExperienceProps | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}