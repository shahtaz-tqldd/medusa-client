"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { Eye, PenLine, Plus, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables/reusable-table";
import TechBadge from "@/components/ui/badge";
import { colors } from "@/lib/colors";
import { formatTimeFromNow } from "@/lib/date";
import { ProjectBasicProps } from "@/lib/api-service/projects";
import Image from "next/image";

interface AdminProjectPageProps {
  projects: ProjectBasicProps[];
  total_count: number;
}

const AdminProjectListPage = ({
  projects,
  total_count,
}: AdminProjectPageProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const project_columns = [
    { header: "Project", accessorKey: "title" },
    { header: "Project Type", accessorKey: "type" },
    { header: "Views", accessorKey: "view_count" },
    { header: "Created On", accessorKey: "created_at" },
    { header: "Action", accessorKey: "action" },
  ];

  const table_options = [
    {
      label: "View",
      icon: Eye,
      action: (id: string) => {
        console.log("View", id);
      },
    },
    {
      label: "Update",
      icon: PenLine,
      action: (id: string) => {
        console.log("Update", id);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      type: "delete" as const,
    },
  ];

  const project_list =
    projects?.map((item, index) => ({
      ...item,
      title: (
        <div className="flx gap-4">
          <Image
            src={item.featured_image_url}
            className="h-12 w-16 rounded-lg object-cover"
            alt={item.title}
            height={100}
            width={100}
          />
          <Text variant="sm">{item.title}</Text>
        </div>
      ),
      type: <TechBadge color={colors[index % 3]}>{item.type}</TechBadge>,
      view_count: <span className="opacity-60">{item?.view_count || 0}</span>,
      created_at: (
        <span className="opacity-60">{formatTimeFromNow(item.created_at)}</span>
      ),
    })) || [];

  const handleDeleteProject = (id: string | number) => {
    console.log(id);
  };

  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Projects</Title>
          <Text variant="sm">Your Portfolio Proects</Text>
        </div>
        <Link href="/admin/projects/create">
          <Button>
            <Plus size={14} />
            New Project
          </Button>
        </Link>
      </div>

      <ReusableTable
        data={project_list}
        columns={project_columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={total_count}
        table_options={table_options}
        onDeleteConfirm={handleDeleteProject}
        deleteLoading={false}
      />
    </div>
  );
};

export default AdminProjectListPage;
