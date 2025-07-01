import {
  BotMessageSquare,
  ChartNoAxesGantt,
  Coffee,
  Shapes,
  Sparkles,
  Text,
  User2,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Overview",
    link: "/admin",
    icon: Shapes,
  },
  {
    title: "Messages",
    link: "/admin/messages",
    icon: BotMessageSquare,
  },
  {
    title: "Projects",
    link: "/admin/projects",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Skills & Expertise",
    link: "/admin/skills",
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
    icon: User2,
  },
];
