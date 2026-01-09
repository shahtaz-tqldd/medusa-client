import {
  ChartNoAxesGantt,
  Coffee,
  FolderKanban,
  MessageSquareDot,
  ShieldUser,
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
    title: "Projects",
    link: "/admin/projects",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Skills & Expertise",
    link: "/admin/skills-expertise",
    icon: Sparkles,
  },
  {
    title: "Experiences",
    link: "/admin/experiences",
    icon: Coffee,
  },
  {
    title: "Blogs",
    link: "/admin/blogs",
    icon: Text,
  },
  {
    title: "Clients",
    link: "/admin/clients",
    icon: ShieldUser,
  },
];
