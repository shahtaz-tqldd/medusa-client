import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text, Title } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import ImageDropzone from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  createAchievement,
  updateAchievement,
} from "@/lib/api-service/achievement-action";
import { useRouter } from "next/navigation";
import { AchievementProps } from "@/lib/api-service/achievement";

interface AddAchievementDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: AchievementProps | null;
}

interface AchievementFormData {
  title: string;
  subtitle: string;
  score: number | null;
  type: string;
  icon_image: File | null;
  credential_url: string;
}

const AddAchievementDialog = ({
  open,
  setOpen,
  mode = "create",
  initialData,
}: AddAchievementDialogProps) => {
  const isEditMode = mode === "edit";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  console.log(initialData);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<AchievementFormData>({
    defaultValues: {
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      score: initialData?.score ?? null,
      type: initialData?.type || "",
      icon_image: null,
      credential_url: initialData?.credential_url || "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || "",
        subtitle: initialData?.subtitle || "",
        score: initialData?.score ?? null,
        type: initialData?.type || "",
        icon_image: null,
        credential_url: initialData?.credential_url || "",
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: AchievementFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // CREATE MODE → send everything
      if (!isEditMode) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value instanceof File ? value : String(value));
          }
        });
      }

      // EDIT MODE → send only changed fields
      if (isEditMode) {
        (Object.keys(dirtyFields) as (keyof AchievementFormData)[]).forEach(
          (key) => {
            const value = data[key];

            if (value !== null && value !== undefined && value !== "") {
              formData.append(
                key,
                value instanceof File ? value : String(value)
              );
            }
          }
        );
      }

      // Prevent empty update request
      if (isEditMode && formData.entries().next().done) {
        toast.info("No changes detected");
        setIsSubmitting(false);
        return;
      }

      const res =
        isEditMode && initialData?.id
          ? await updateAchievement(initialData.id, formData)
          : await createAchievement(formData);

      if (res?.success) {
        toast.success(
          isEditMode
            ? "Achievement Updated Successfully!"
            : "Achievement Created Successfully!"
        );
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Achievement error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <Title variant="sm">
              {isEditMode ? "Update Achievement" : "Add New Achievement"}
            </Title>
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter your achievement title"
            />
            {errors.title && (
              <Text variant="sm" className="text-red-500 mt-1">
                {errors.title.message}
              </Text>
            )}
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              {...register("subtitle", { required: "Subtitle is required" })}
              placeholder="Achievement source or rating"
            />
            {errors.subtitle && (
              <Text variant="sm" className="text-red-500 mt-1">
                {errors.subtitle.message}
              </Text>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                {...register("score")}
                placeholder="Current achievement score"
              />
              {errors.score && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.score.message}
                </Text>
              )}
            </div>
            <div>
              <Label htmlFor="category">Type *</Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Achievement type is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full !h-11">
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                      <SelectItem value="Competitive Programming">
                        Competitive Programming
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.type.message}
                </Text>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="credential_url">Credential Link</Label>
            <Input
              id="credential_url"
              {...register("credential_url", {
                required: "Credential link is required",
              })}
              placeholder="Enter your credential link"
            />
            {errors.credential_url && (
              <Text variant="sm" className="text-red-500 mt-1">
                {errors.credential_url.message}
              </Text>
            )}
          </div>
          <div className="max-w-[200px]">
            <ImageDropzone
              label="Add an icon"
              name="icon_image"
              setValue={(name: string, file: File) =>
                setValue(name as keyof AchievementFormData, file)
              }
              initialImageUrl={initialData?.icon_image}
              className="h-40"
            />
          </div>
        </form>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner spinner-white"></span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementDialog;
