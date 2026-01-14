export interface DataResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}


export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}