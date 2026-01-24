import { apiFetch } from "./client";
import { DataResponse } from "./_types";

export interface AchievementProps {
  id: string;
  title: string;
  subtitle: string;
  score: number;
  type: string;
  icon_image: string;
  credential_url: string;
}

export async function fetchAchievements() {
  return apiFetch<DataResponse<AchievementProps[]>>("/services/achievements/", {
    auth: false,
    revalidate: 3600, // Revalidate every hour
    tags: ["achievements"],
  });
}
