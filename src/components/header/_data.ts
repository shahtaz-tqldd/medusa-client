import {
  BlogIcon,
  GithubIcon,
  ResumeIcon,
} from "@/assets/icons/icons";
import { Briefcase, FileText, FolderOpen, Home, User } from "lucide-react";
import { NavLinkProps } from "./_types";

export const HEADER_LINKS = [
  {
    id: 0,
    title: "Blogs",
    link: "/blogs",
    icon: BlogIcon,
  },
  {
    id: 1,
    title: "Github",
    link: "https://github.com/shahtaz-tqldd/",
    icon: GithubIcon,
  },
  {
    id: 1,
    title: "Get Resume",
    link: "https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?pli=1",
    icon: ResumeIcon,
  },
];

export const DRAWER_NAV_LINKS: NavLinkProps[] = [
    { href: '/', label: 'Homepage', icon: Home },
    { href: '/blogs', label: 'Blogs', icon: FileText },
    { href: '#projects', label: 'Projects', icon: FolderOpen },
    { href: '#experiences', label: 'Work Experiences', icon: Briefcase },
    { href: '#about', label: 'About Me', icon: User }
];