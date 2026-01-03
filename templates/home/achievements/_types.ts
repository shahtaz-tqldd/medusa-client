import { ReactElement } from "react";

export interface AchievementProps {
  icon?: ReactElement;
  accentColor: string;
  type: string;
  title: string;
  subtitle: string;
  link: string;
  rating?: string;
}