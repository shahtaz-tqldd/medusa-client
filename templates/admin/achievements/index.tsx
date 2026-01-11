"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { AchievementProps } from "@/lib/api-service/achievement";
import { FolderOpen, Plus } from "lucide-react";
import AddAchievementDialog from "./add-achievement-modal";
import AchievementCard from "@/templates/home/achievements/achievement-card";
import DeleteDialog from "@/components/dialog/delete-dialog";
import { deleteAchievement } from "@/lib/api-service/achievement-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AdminAchievementPage = ({
  achievements,
}: {
  achievements: AchievementProps[];
}) => {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementProps | null>(null);

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteAchievement(selectedId);
    if (res.success) {
      toast.success("Achievement deleted successfully");
      setDeleteModalOpen(false);
      setSelectedId(null);
      router.refresh();
    }
  };
  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Achievements</Title>
          <Text variant="sm">Relevant Achievements to Showcase</Text>
        </div>

        <Button onClick={() => setAddModalOpen(true)}>
          <Plus size={14} />
          Achievement
        </Button>
      </div>

      {achievements?.length === 0 && <NoData />}

      <div className="grid grid-cols-3 gap-5">
        {achievements.map((item, index) => (
          <AchievementCard
            key={index}
            achievement={item}
            index={index}
            is_admin
            handleDelete={() => {
              setDeleteModalOpen(true);
              setSelectedId(item.id);
            }}
            handleEdit={() => {
              setSelectedAchievement(item);
              setEditModalOpen(true);
            }}
          />
        ))}
      </div>
      <AddAchievementDialog open={addModalOpen} setOpen={setAddModalOpen} />
      <AddAchievementDialog
        open={editModalOpen}
        setOpen={setEditModalOpen}
        mode="edit"
        initialData={selectedAchievement}
      />
      <DeleteDialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAchievementPage;

const NoData = () => {
  return (
    <div className="center min-h-[67vh] flex-col gap-4 dark:bg-white/5 bg-white rounded-2xl">
      <FolderOpen size={48} strokeWidth="1" className="opacity-40" />
      <Text variant="sm" className="max-w-xs text-center">
        No Achievements have been added, Please add some achievements.
      </Text>
    </div>
  );
};
