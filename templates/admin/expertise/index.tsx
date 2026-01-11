"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { Ellipsis, FolderOpen, PenLine, Plus, Trash2 } from "lucide-react";

import { ExpertiseProps } from "@/lib/api-service/expertise";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "@/components/dialog/delete-dialog";
import Image from "next/image";
import { deleteExpertise } from "@/lib/api-service/expertise-action";

interface ExpertisePageProps {
  expertises: ExpertiseProps[];
}

const AdminExpertisePage = ({ expertises }: ExpertisePageProps) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteExpertise = async () => {
    if (!selectedId) return;
    const res = await deleteExpertise(selectedId);
    if (res?.success) {
      toast.success("Expertise Deleted Successfully!");
      setDeleteModalOpen(false);
      setSelectedId(null);
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to delete Expertise");
    }
  };
  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Expertise</Title>
          <Text variant="sm">Expersie showcase for the portfolio</Text>
        </div>
        <Link href="/admin/expertise/create">
          <Button>
            <Plus size={14} />
            Expertise
          </Button>
        </Link>
      </div>
      {expertises?.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expertises.map((item) => (
            <ExpertiseCard
              expertise={item}
              key={item.id}
              handleDelete={() => {
                setDeleteModalOpen(true);
                setSelectedId(item.id);
              }}
              handleEdit={() => {
                router.push(`/admin/expertise/${item.id}/update`);
              }}
            />
          ))}
        </div>
      )}
      <DeleteDialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleDeleteExpertise}
      />
    </div>
  );
};

export default AdminExpertisePage;

const ExpertiseCard = ({
  expertise,
  handleDelete,
  handleEdit,
}: {
  expertise: ExpertiseProps;
  handleDelete: () => void;
  handleEdit: () => void;
}) => {
  return (
    <Card className="flex gap-4">
      <div className="max-w-48">
        <Image
          src={expertise.featured_image}
          width={200}
          height={200}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex-1">
        <div className="flbx">
          <Title variant="sm">{expertise.name}</Title>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full h-fit">
              <Ellipsis className="h-9 w-9 p-2.5 rounded-full dark:hover:bg-white/10 hover:bg-gray-200 tr" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEdit}>
                <PenLine className="mr-0.5 !h-3.5 !w-3.5 opacity-60" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="mr-0.5 !h-3.5 !w-3.5 opacity-60" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Text variant="sm" className="line-clamp-3 mt-2">
          {expertise.description}
        </Text>
        <div className="flex flex-wrap gap-y-2 gap-x-1 mt-6">
          {expertise.tech_stacks.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-emerald-600/10 dark:bg-black/30 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

const NoData = () => {
  return (
    <div className="center min-h-[67vh] flex-col gap-4 dark:bg-white/5 bg-white rounded-2xl">
      <FolderOpen size={48} strokeWidth="1" className="opacity-40" />
      <Text variant="sm" className="max-w-xs text-center">
        No Expertise has been added, Please add some expertise.
      </Text>
    </div>
  );
};
