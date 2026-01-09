import { apiFetch } from "./client";

export interface Visitor {
  id: number;
  city: string;
  country: string;
  device_name: string;
  device_type: string;
  visit_count: number;
  last_visit: string;
  first_visit: string;
}

export interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Visitor[];
}

interface fetchVisitorsResponse {
  status: number;
  success: boolean;
  message: string;
  data: PaginatedResponse
}

export async function fetchVisitors(page = 1, page_size = 10) {
  const params = new URLSearchParams({
    offset: ((page - 1) * page_size).toString(),
    limit: page_size.toString(),
  });
  return apiFetch<fetchVisitorsResponse>(
    `/base/visitors/list?${params.toString()}`,
    {
      auth: true,
      cache: "no-store",
    }
  );
}
