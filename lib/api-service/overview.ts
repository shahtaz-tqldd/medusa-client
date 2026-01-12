import { DataResponse } from "./_types";
import { apiFetch } from "./client";

export interface OverviewStats {
  visitors: {
    total: number;
    this_month: number;
    month_wise: {
      month: string;
      visitor_count: number;
    }[];
    country_wise: {
      country: string;
      visitor_count: number;
    }[];
    device_wise: {
      desktop: number;
      mobile: number;
    };
  };

  conversations: {
    total: number;
    meetings_scheduled: number;
  };
  proposals: {
    total: number;
    onboarded_clients: number;
  };

  blogs: {
    total: number;
    total_reads: number;
  };
  projects: {
    total: number;
    total_views: number;
  };
}

export async function fetchOverviewStats() {
  return apiFetch<DataResponse<OverviewStats>>("/base/overview/stats", {
    auth: true,
    cache: "no-store",
  });
}