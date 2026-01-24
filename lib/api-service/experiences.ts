import { apiFetch } from "./client";
import { DataResponse } from "./_types";

export interface ExperienceProps {
  id: string;
  position: string;
  details: string;
  started_at: Date | string;
  ended_at?: Date | string | null | undefined;
  company_name: string;
  company_location: string;
  company_website: string;
  highlights: string[];
  key_contributions: string[];
  tech_stacks: string[];
}

export async function fetchExperiences() {
  return apiFetch<DataResponse<ExperienceProps[]>>("/services/experiences/", {
    auth: false,
    revalidate: 3600, // Revalidate every hour
    tags: ["experiences"],
  });
}

export async function fetchExperienceById(id: string) {
  return apiFetch<DataResponse<ExperienceProps>>(`/services/experiences/${id}/`, {
    auth: false,
    revalidate: 3600,
    tags: ["experiences", `experience-${id}`],
  });
}
