import {
  Atom,
  Coffee,
  FolderKanban,
  Gift,
  Layers,
  MessageSquareDot,
  PenLine,
  Sparkles,
  Text,
  Users,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Overview",
    link: "/admin",
    icon: FolderKanban,
  },
  {
    title: "Messages",
    link: "/admin/messages",
    icon: MessageSquareDot,
  },
  {
    title: "Visitors",
    link: "/admin/visitors",
    icon: Users,
  },
  {
    title: "Skills",
    link: "/admin/skills",
    icon: Sparkles,
  },
  {
    title: "Expertise",
    link: "/admin/expertise",
    icon: Atom,
  },
  {
    title: "Projects",
    link: "/admin/projects",
    icon: Layers,
  },
  {
    title: "Experiences",
    link: "/admin/experiences",
    icon: Coffee,
  },
  {
    title: "Blogs",
    link: "/admin/blogs",
    icon: PenLine,
  },
  {
    title: "Achievements",
    link: "/admin/achievements",
    icon: Gift,
  },
];
