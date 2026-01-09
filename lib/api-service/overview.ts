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

    device_wise: {
      desktop: number;
      mobile: number;
    };
    country_wise: {
      country: string;
      visitor_count: number;
    }[];

    desktop: number;
    mobile: number;
  };

  conversations: {
    total: number;
    unread: number;
    meetings_scheduled: number;
    upcoming_meetings: number;
  };

  blogs: {
    total: number;
    total_reads: number;
  };

  proposals: {
    total: number;
    onboarded_clients: number;
  };
}

export async function fetchOverviewStats() {
  return apiFetch<DataResponse<OverviewStats>>("/base/overview/stats", {
    auth: true,
    cache: "no-store",
  });
}