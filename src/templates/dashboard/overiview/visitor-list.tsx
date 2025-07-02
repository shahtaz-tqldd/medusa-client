import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/table";

import { formatTimeFromNow } from "@/lib/date";
import { Visitor } from "@/lib/overview-service";
import Pagination from "@/components/reusable/pagination";

export const visitorColumns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "Region",
  },
  {
    accessorKey: "device_type",
    header: "Device",
  },
  {
    accessorKey: "last_visit",
    header: "Visited",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {formatTimeFromNow(row.original.last_visit)}
      </span>
    ),
  },
  {
    accessorKey: "visit_count",
    header: "Visit Count",
  },
];

interface VisitorListProps {
  visitors: Visitor[];
  total: number;
  page: number;
  limit: number;
  setPage: () => void;
}

const VisitorList = ({
  visitors,
  total,
  page,
  setPage,
  limit,
}: VisitorListProps) => {
  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">Visitor List</h2>
      <div className="h-[372px]">
        <DataTable columns={visitorColumns} data={visitors} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalCount={total}
        limit={limit}
      />
    </div>
  );
};

export default VisitorList;
