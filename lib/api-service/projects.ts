import { apiFetch } from "./client";
import { DataResponse, PaginatedResponse } from "./_types";

export interface ProjectBasicProps {
  id: string;
  title: string;
  type: string;
  featured_image_url: string;
  view_count: number;
  live_link?: string;
  created_at: string;
}


export async function fetchProjects(page = 1, page_size = 10, sorted_by = "") {
  const params = new URLSearchParams({
    offset: ((page - 1) * page_size).toString(),
    limit: page_size.toString(),
  });
  if (sorted_by) {
    params.set("ordering", `-${sorted_by}`)
  }
  return apiFetch<DataResponse<PaginatedResponse<ProjectBasicProps[]>>>(
    `/projects/list?${params.toString()}`,
    {
      cache: "no-store"
    }
  );
}

