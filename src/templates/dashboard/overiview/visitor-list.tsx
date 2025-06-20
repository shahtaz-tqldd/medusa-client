import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/table";

import type { Visitor } from "./_types";
import { visitor_demo_data } from "./_demo-data";

export const visitorColumns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.icon}
          className="h-4 w-auto"
          alt={row.original.country}
        />
        <span>{row.original.country}</span>
      </div>
    ),
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "device",
    header: "Device",
  },
  {
    accessorKey: "visited",
    header: "Visited",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {row.original.visited}
      </span>
    ),
  },
  {
    accessorKey: "visitCount",
    header: "Count",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.visitCount}</span>
    ),
  },
];

const VisitorList = () => {
  const data: Visitor[] = visitor_demo_data;
  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">Visitor List</h2>
      <DataTable columns={visitorColumns} data={data} />
    </div>
  );
};

export default VisitorList;
