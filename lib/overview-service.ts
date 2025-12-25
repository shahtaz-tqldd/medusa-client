export interface OverviewStats {
  visitors: {
    total: number;
    this_month: number;
    cycles: {
      month: string;
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

export interface Visitor {
  id: number;
  city: string;
  country: string;
  device_name: string;
  device_type: string;
  visit_count: number;
  last_visit: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const fetchOverviewStats = async (): Promise<OverviewStats | null> => {
  try {
    const authToken = localStorage.getItem("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}base/overview/stats/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch overview stats: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data as OverviewStats;
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    return null;
  }
};

export const fetchVisitorList = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  ordering: string = "-last_visit"
): Promise<PaginatedResponse<Visitor> | null> => {
  try {
    const authToken = localStorage.getItem("access_token");
    const params = new URLSearchParams({
      offset: ((page - 1) * limit).toString(),
      limit: limit.toString(),
      ordering,
    });

    if (search) {
      params.append("search", search);
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }base/visitors/list/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success || !result.data?.results) {
      throw new Error("Failed to fetch visitor list");
    }

    return result.data as PaginatedResponse<Visitor>;
  } catch (error) {
    console.error("Error fetching visitor list:", error);
    return null;
  }
};
