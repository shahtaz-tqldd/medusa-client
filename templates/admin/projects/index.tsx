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
import { deleteProject } from "@/lib/api-service/project-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProjectDetailsDrawer from "@/templates/projects/project-details-drawer";

interface AdminProjectPageProps {
  projects: ProjectBasicProps[];
  total_count: number;
}

const AdminProjectListPage = ({
  projects,
  total_count,
}: AdminProjectPageProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [projectView, setProjectView] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

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
        setProjectView(true);
        setProjectId(id);
      },
    },
    {
      label: "Update",
      icon: PenLine,
      action: (id: string) => {
        router.push(`/admin/projects/${id}/update`);
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
      type: (
        <TechBadge color={colors[index % 3]}>
          {item.type?.split("_").join(" ")}
        </TechBadge>
      ),
      view_count: <span className="opacity-60">{item?.view_count || 0}</span>,
      created_at: (
        <span className="opacity-60">{formatTimeFromNow(item.created_at)}</span>
      ),
    })) || [];

  const handleDeleteProject = async (id: string) => {
    const res = await deleteProject(id.toString());
    if (res?.success) {
      toast.success(res?.message || "Projct Deleted Successfully!");
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to delete Project");
    }
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

      <ProjectDetailsDrawer
        isOpen={projectView}
        setIsOpen={setProjectView}
        projectId={projectId}
        admin_view
      />
    </div>
  );
};

export default AdminProjectListPage;
