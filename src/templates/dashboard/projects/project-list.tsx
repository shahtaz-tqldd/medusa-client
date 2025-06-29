"use client"

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Ellipsis } from "lucide-react";

import Capsule from "@/components/status/capsule";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/table";

import { Project } from "@/templates/home/projects/_types";

const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {new Date(row.original.created_at).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Capsule
        variant="success"
        className={`text-xs capitalize ${
          row.original.status === "completed"
            ? "border-green-400 text-green-500"
            : "border-yellow-400 text-yellow-500"
        }`}
      >
        {row.original.status}
      </Capsule>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Ellipsis size={16} />
        </Button>
      </div>
    ),
  },
];

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="p-4">
      <DataTable columns={projectColumns} data={projects} />
    </div>
  );
};

export default ProjectList;
