"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import ImageDropzone from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Text, Title } from "@/components/ui/typography";
import {
  createExpertise,
  updateExpertise,
} from "@/lib/api-service/expertise-action";
import { ProjectBasicProps } from "@/lib/api-service/projects";
import { Plus, Save, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ExpertiseProps,
  ProjectSelectProps,
} from "@/lib/api-service/expertise";

interface ExpertiseFormProps {
  name: string;
  description: string;
  featured_image: File | null;
  tech_stacks: string[];
  features: { content: string }[];
  projects: string[];
}

interface CreateExpertisePageProps {
  projects: ProjectBasicProps[];
  initialData?: ExpertiseProps & {
    featured_image?: string;
  };
  expertiseId?: string;
}

const CreateExpertisePage = ({
  projects,
  initialData,
  expertiseId,
}: CreateExpertisePageProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isEditMode = !!expertiseId;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExpertiseFormProps>({
    defaultValues: {
      features: [{ content: "" }],
      tech_stacks: [],
      projects: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      // Extract project IDs from the projects array
      const projectIds = Array.isArray(initialData.projects)
        ? initialData.projects.map((project: ProjectSelectProps) =>
            typeof project === "string" ? project : project.id
          )
        : [];

      reset({
        name: initialData.name,
        description: initialData.description,
        tech_stacks: initialData.tech_stacks || [],
        projects: projectIds,
        features: initialData.features?.length
          ? initialData.features.map((f) => ({ content: f }))
          : [{ content: "" }],
      });
    }
  }, [initialData, reset]);

  const selectedProjects = watch("projects");

  const onSubmit = async (data: ExpertiseFormProps) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Only append fields that have changed
      if (data.name !== initialData?.name) {
        formData.append("name", data.name);
      }

      if (data.description !== initialData?.description) {
        formData.append("description", data.description || "");
      }

      // For files, always send if a new one is selected
      if (data.featured_image) {
        formData.append("featured_image", data.featured_image);
      }

      // Compare arrays for tech_stacks
      const techStacksChanged =
        JSON.stringify(data.tech_stacks || []) !==
        JSON.stringify(initialData?.tech_stacks || []);
      if (techStacksChanged) {
        formData.append("tech_stacks", JSON.stringify(data.tech_stacks || []));
      }

      // Compare features
      const features = data.features
        .filter((f) => f.content.trim() !== "")
        .map((f) => f.content);
      const featuresChanged =
        JSON.stringify(features) !==
        JSON.stringify(initialData?.features || []);
      if (featuresChanged) {
        formData.append("features", JSON.stringify(features));
      }

      // Compare projects
      const initialProjectIds = Array.isArray(initialData?.projects)
        ? initialData.projects.map((p) => (typeof p === "string" ? p : p.id))
        : [];

      const currentProjectIds = [...(data.projects || [])].sort();
      const sortedInitialIds = [...initialProjectIds].sort();

      const projectsChanged =
        JSON.stringify(currentProjectIds) !== JSON.stringify(sortedInitialIds);

      if (projectsChanged) {
        formData.append("projects", JSON.stringify(data.projects || []));
      }

      const res = expertiseId
        ? await updateExpertise(expertiseId, formData)
        : await createExpertise(formData);

      if (res?.success) {
        toast.success(
          expertiseId
            ? "Expertise Updated Successfully!"
            : "Expertise Created Successfully!"
        );
        router.push("/admin/expertise");
      } else {
        toast.error(
          res?.message ||
            `Failed to ${expertiseId ? "update" : "create"} expertise`
        );
      }
    } catch (error) {
      console.error("Expertise operation error:", error);
      toast.error(
        `An error occurred while ${
          expertiseId ? "updating" : "creating"
        } the expertise`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const handleProjectSelect = (projectId: string) => {
    if (!selectedProjects.includes(projectId)) {
      setValue("projects", [...selectedProjects, projectId]);
    }
  };

  const handleProjectRemove = (projectId: string) => {
    setValue(
      "projects",
      selectedProjects.filter((id) => id !== projectId)
    );
  };

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <Title>
            {isEditMode ? "Update Expertise" : "Create New Expertise"}
          </Title>
          <Text variant="sm">
            Showcase your expertise describing your proficiencies
          </Text>
        </div>
        <div className="flex gap-2">
          {!isEditMode && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Save size={14} className="mr-2" />
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Publishing..."
              : isEditMode
              ? "Update Expertise"
              : "Publish"}
          </Button>
        </div>
      </div>

      <form className="grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card className="space-y-6">
            <div>
              <Label htmlFor="title">Name *</Label>
              <Input
                id="title"
                {...register("name", { required: "Name is required" })}
                placeholder="Eg., Web Development"
              />
              {errors.name && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.name.message}
                </Text>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Short description for the projects"
                className="min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="features">Features *</Label>
              <div className="space-y-2">
                {featureFields.map((item, itemIndex) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input
                      {...register(`features.${itemIndex}.content` as const)}
                      placeholder={`Feature ${itemIndex + 1}`}
                      className="flex-1"
                    />
                    {featureFields.length > 1 && (
                      <IconButton
                        icon={Trash2}
                        onClick={() => removeFeature(itemIndex)}
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => appendFeature({ content: "" })}
                >
                  <Plus size={14} className="mr-1" /> Add Feature
                </Button>
              </div>
            </div>
          </Card>
          <Card className="space-y-6">
            <div>
              <Label htmlFor="category">Projects</Label>
              <Select onValueChange={handleProjectSelect}>
                <SelectTrigger className="w-full !h-11">
                  <SelectValue placeholder="Select Projects" />
                </SelectTrigger>
                <SelectContent>
                  {projects
                    .filter((project) => !selectedProjects.includes(project.id))
                    .map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.projects && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.projects.message}
                </Text>
              )}

              {selectedProjects.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Text variant="sm" className="font-medium">
                    Selected Projects ({selectedProjects.length})
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProjects.map((projectId) => {
                      const project = getProjectById(projectId);
                      return project ? (
                        <div
                          key={projectId}
                          className="flex items-center justify-between p-3 rounded-lg border dark:border-white/10 border-gray-200"
                        >
                          <Text variant="sm">{project.title}</Text>
                          <button
                            type="button"
                            onClick={() => handleProjectRemove(projectId)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card className="space-y-6">
            <ImageDropzone
              label="Add a featured Image"
              name="featured_image"
              setValue={(name: string, file: File) =>
                setValue(name as keyof ExpertiseFormProps, file)
              }
              initialImageUrl={initialData?.featured_image}
            />
            <div className="space-y-2">
              <Label>Tech Stacks</Label>
              <Controller
                name="tech_stacks"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Input
                      placeholder="Type a tag and press Enter"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          const value = inputValue.trim();
                          if (!value) return;

                          if (field.value.includes(value)) {
                            setInputValue("");
                            return;
                          }

                          field.onChange([...field.value, value]);
                          setInputValue("");
                        }
                      }}
                    />

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((tag: string) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((t: string) => t !== tag)
                                )
                              }
                              className="text-gray-500 hover:text-red-500"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateExpertisePage;
