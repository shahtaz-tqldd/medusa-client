import { DataResponse } from "./_types";
import { apiFetch } from "./client";

export interface SkillsProps {
  title: string;
  expertise: string;
  my_story: string;
  key_focus_areas: string[];
  language_and_frameworks: string[];
  tools_and_database: string[];
  other_competency: string[];
}

export async function fetchSkills() {
  return apiFetch<DataResponse<SkillsProps>>("/services/skills/", {
    auth: false,
    revalidate: 3600, // Revalidate every hour
    tags: ["skills"],
  });
}
