import { apiFetch } from "./client";
import { DataResponse } from "./_types";

export type ProjectSelectProps = {
  id: string;
  title: string;
  role: string;
};

export interface ExpertiseProps {
  id: string;
  name: string;
  description: string;
  featured_image: string;
  features: string[];
  tech_stacks: string[];
  projects: ProjectSelectProps[];
}

export async function fetchExpertise() {
  return apiFetch<DataResponse<ExpertiseProps[]>>("/services/", {
    auth: false,
    cache: "no-store",
  });
}

export async function fetchExpertiseById(id: string) {
  return apiFetch<DataResponse<ExpertiseProps>>(`/services/${id}/`, {
    auth: false,
    cache: "no-store",
  });
}
