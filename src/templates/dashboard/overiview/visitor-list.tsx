import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/table";

import { formatTimeFromNow } from "@/lib/date";
import { Visitor } from "@/lib/overview-service";

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
}

const VisitorList = ({ visitors }: VisitorListProps) => {
  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">Visitor List</h2>
      <DataTable columns={visitorColumns} data={visitors} />
    </div>
  );
};

export default VisitorList;
