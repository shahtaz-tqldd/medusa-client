import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  img: StaticImageData;
  type: string;
  created_at: string;
  status: string;
  tech_stacks: string[];
  liveLink?: string | undefined;
  features: string[];
  credentials?: {
    email: string;
    password: string;
  };
}
