import { DataResponse, PaginatedResponse } from './_types';
import { apiFetch } from './client';

/**
 * Visitor data structure from backend
 */
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


export async function fetchVisitors(page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    offset: ((page - 1) * pageSize).toString(),
    limit: pageSize.toString(),
  });

  return apiFetch<DataResponse<PaginatedResponse<Visitor[]>>>(
    `/base/visitors/list?${params.toString()}`,
    {
      auth: true,
      cache: 'no-store',
    }
  );
}
