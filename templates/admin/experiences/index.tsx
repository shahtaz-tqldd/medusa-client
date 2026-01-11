"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReusableTable from "@/components/tables/reusable-table";
import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { Eye, PenLine, Plus, Trash2 } from "lucide-react";

import { ExperienceProps } from "@/lib/api-service/experiences";
import { deleteExperience } from "@/lib/api-service/experience-action";
import { getDuration } from "@/lib/date";

interface ExperiencePageProps {
  experiences: ExperienceProps[];
}

const AdminExperiencePage = ({ experiences }: ExperiencePageProps) => {
  const router = useRouter();
  const experience_columns = [
    { header: "Position", accessorKey: "position" },
    { header: "Company", accessorKey: "company_name" },
    { header: "Location", accessorKey: "company_location" },
    { header: "Duration", accessorKey: "duration" },
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

  const experience_list =
    experiences.map((item) => ({
      ...item,
      company_name: <span className="opacity-60">{item.company_name}</span>,
      company_location: (
        <span className="opacity-60">{item.company_location}</span>
      ),
      duration: (
        <span className="opacity-60">
          {getDuration(item.started_at, item.ended_at || undefined)}
        </span>
      ),
    })) || [];

  const handleDeleteExperience = async (id: string | number) => {
    const res = await deleteExperience(id.toString());
    if (res?.success) {
      toast.success("Experience Deleted Successfully!");
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to delete Experience");
    }
  };
  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Work Experiences</Title>
          <Text variant="sm">Relevant Work Experiences to Showcase</Text>
        </div>
        <Link href="/admin/experiences/create">
          <Button>
            <Plus size={14} />
            Experience
          </Button>
        </Link>
      </div>
      <ReusableTable
        data={experience_list}
        columns={experience_columns}
        totalItems={experiences?.length}
        table_options={table_options}
        onDeleteConfirm={handleDeleteExperience}
        deleteLoading={false}
        page={1}
        setPage={() => {}}
        pageSize={10}
        setPageSize={() => {}}
      />
    </div>
  );
};

export default AdminExperiencePage;
