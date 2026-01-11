"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReusableTable from "@/components/tables/reusable-table";
import { Text, Title } from "@/components/ui/typography";
import { PaginatedResponse } from "@/lib/api-service/visitor";
import { formatTimeFromNow } from "@/lib/date";

interface Props {
  visitor: PaginatedResponse;
  page: number;
  pageSize: number;
}

const VisitorListPage = ({ visitor, page, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePagination = (newPage: number, newPageSize = pageSize) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(newPageSize));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const visitor_columns = [
    { header: "City", accessorKey: "city" },
    { header: "Country", accessorKey: "country" },
    { header: "Device", accessorKey: "device_name" },
    { header: "Device Type", accessorKey: "device_type" },
    { header: "Last Visit", accessorKey: "last_visit" },
    { header: "First Visit", accessorKey: "first_visit" },
    { header: "Visit Count", accessorKey: "visit_count" },
  ];

  const visitor_list = visitor.results.map((v) => ({
    ...v,
    city: <span className="opacity-60">{v.city}</span>,
    country: <span className="opacity-60">{v.country}</span>,
    device_name: <span className="opacity-60">{v.device_name}</span>,
    device_type: <span className="opacity-60">{v.device_type}</span>,
    last_visit: (
      <span className="opacity-60">{formatTimeFromNow(v.last_visit)}</span>
    ),
    first_visit: (
      <span className="opacity-60">{formatTimeFromNow(v.first_visit)}</span>
    ),
    visit_count: <span className="opacity-60">{v.visit_count}</span>,
  }));

  return (
    <div className="space-y-10">
      <div>
        <Title>Visitors</Title>
        <Text variant="sm">Portfolio Visitor List</Text>
      </div>

      <ReusableTable
        data={visitor_list}
        columns={visitor_columns}
        page={page}
        pageSize={pageSize}
        totalItems={visitor.count}
        setPage={(p) => updatePagination(p)}
        setPageSize={(ps) => updatePagination(1, ps)}
      />
    </div>
  );
};

export default VisitorListPage;
