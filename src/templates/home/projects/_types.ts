export interface Project {
  id: string;
  name: string;
  description: string;
  images: {
    main: string;
    primary: string;
    secondary: string;
    accent: string | null;
  };
  type: string;
  live_link?: string;
  github_link?: string;
  tech_stacks: string[];
  tags: string[];
  features: string[];
  created_at: string;
  status: string;
}

export interface MetaProps {
  currentId: string;
  nextId: string;
  prevId: string;
}

export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
