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
    link: "/dashboard",
    icon: Shapes,
  },
  {
    title: "Messages",
    link: "/dashboard/messages",
    icon: BotMessageSquare,
  },
  {
    title: "Projects",
    link: "/dashboard/projects",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Skills & Expertise",
    link: "/dashboard/skills",
    icon: Sparkles,
  },
  {
    title: "Experiences",
    link: "/dashboard/experiences",
    icon: Coffee,
  },
  {
    title: "Blogs",
    link: "/dashboard/blogs",
    icon: Text,
  },
  {
    title: "Clients",
    link: "/dashboard/clients",
    icon: User2,
  },
];
