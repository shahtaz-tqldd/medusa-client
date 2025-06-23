import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  name: string;
  img: StaticImageData;
  projectType: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
  techs: string[];
  tags: string[];
  featureList: string[];
  screens: string[];
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
