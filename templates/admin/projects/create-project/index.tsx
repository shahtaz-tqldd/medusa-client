"use client";

import React, { useState, useRef, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

// components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Text, Title } from "@/components/ui/typography";
import IconButton from "@/components/ui/icon-button";
import ImageDropzone from "@/components/ui/image-upload";

// utils
import {
  createProject,
  ProjectDetailsProps,
  updateProject,
} from "@/lib/api-service/project-action";

// icons
import { Plus, Save, Trash2, X, Upload } from "lucide-react";

interface ProjectFormData {
  title: string;
  description: string;
  case_study: string;
  featured_image: File | null;
  project_images: File[];
  project_type: string;
  tech_stacks: string[];
  features: { content: string }[];
  links: { type: string; label: string; url: string }[];
}

const CreateProjectPage = ({
  initialData,
  projectId,
}: {
  initialData?: ProjectDetailsProps;
  projectId?: string;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [projectImagePreviews, setProjectImagePreviews] = useState<string[]>(
    []
  );
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [initialFormData, setInitialFormData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!projectId;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      features: [{ content: "" }],
      links: [{ type: "", label: "", url: "" }],
      tech_stacks: [],
      project_images: [],
    },
  });

  // Initialize form with existing data
  useEffect(() => {
    if (initialData && isEditMode) {
      // Create a copy of initial data for comparison later
      const formData = {
        title: initialData.title || "",
        description: initialData.description || "",
        case_study: initialData.case_study || "",
        project_type: initialData.type || "",
        tech_stacks: initialData.tech_stacks || [],
        features: initialData.features?.length
          ? initialData.features.map((f) => ({ content: f }))
          : [{ content: "" }],
        links: initialData.links?.length
          ? initialData.links.map((link) => ({
              type: link.type || "",
              label: link.label || "",
              url: link.url || "",
            }))
          : [{ type: "", label: "", url: "" }],
        project_images: [],
      };

      setInitialFormData(formData);
      reset(formData);

      // Set existing project images
      if (initialData.images?.length) {
        setExistingImages(initialData.images);
        const imagePreviews = initialData.images.map((img) => img.image_url);
        setProjectImagePreviews(imagePreviews);
      }
    }
  }, [initialData, isEditMode, reset]);

  const projectImages = watch("project_images") || [];
  const featuredImage = watch("featured_image");

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (isEditMode && initialFormData) {
        // Only send changed fields in edit mode
        if (data.title !== initialFormData.title) {
          formData.append("title", data.title);
        }

        if (data.description !== initialFormData.description) {
          formData.append("description", data.description || "");
        }

        if (data.case_study !== initialFormData.case_study) {
          formData.append("case_study", data.case_study || "");
        }

        if (data.project_type !== initialFormData.project_type) {
          formData.append("type", data.project_type || "");
        }

        // Check if featured image has changed
        if (featuredImage) {
          formData.append("featured_image", featuredImage);
        }

        // Check if project images have changed
        if (data.project_images && data.project_images.length > 0) {
          data.project_images.forEach((file) => {
            formData.append("project_images", file);
          });
        }

        // Send images to delete
        if (imagesToDelete.length > 0) {
          formData.append("images_to_delete", JSON.stringify(imagesToDelete));
        }

        // Check if tech stacks have changed
        if (
          JSON.stringify(data.tech_stacks) !==
          JSON.stringify(initialFormData.tech_stacks)
        ) {
          formData.append(
            "tech_stacks",
            JSON.stringify(data.tech_stacks || [])
          );
        }

        // Check if features have changed
        const features = data.features
          .filter((f) => f.content.trim() !== "")
          .map((f) => f.content);

        const initialFeatures = initialFormData.features
          .filter((f: any) => f.content.trim() !== "")
          .map((f: any) => f.content);

        if (JSON.stringify(features) !== JSON.stringify(initialFeatures)) {
          formData.append("features", JSON.stringify(features));
        }

        // Check if links have changed
        const links = data.links.filter(
          (link) => link.type && link.label && link.url
        );

        const initialLinks = initialFormData.links.filter(
          (link: any) => link.type && link.label && link.url
        );

        if (JSON.stringify(links) !== JSON.stringify(initialLinks)) {
          formData.append("links", JSON.stringify(links));
        }

        // Add a flag to indicate this is an update
        formData.append("is_update", "true");
      } else {
        // For new projects, send all fields
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("case_study", data.case_study || "");
        formData.append("type", data.project_type || "");

        if (featuredImage) {
          formData.append("featured_image", featuredImage);
        }

        if (data.project_images && data.project_images.length > 0) {
          data.project_images.forEach((file) => {
            formData.append("project_images", file);
          });
        }

        formData.append("tech_stacks", JSON.stringify(data.tech_stacks || []));

        const features = data.features
          .filter((f) => f.content.trim() !== "")
          .map((f) => f.content);
        formData.append("features", JSON.stringify(features));

        const links = data.links.filter(
          (link) => link.type && link.label && link.url
        );
        formData.append("links", JSON.stringify(links));
      }

      // Call the appropriate API function
      const res = isEditMode
        ? await updateProject(projectId, formData)
        : await createProject(formData);

      if (res?.success) {
        toast.success(
          isEditMode
            ? "Project Updated Successfully!"
            : "Project Created Successfully!"
        );
        router.push("/admin/projects");
      } else {
        toast.error(
          res?.message ||
            `Failed to ${isEditMode ? "update" : "create"} project`
        );
      }
    } catch (error) {
      console.error("Project submission error:", error);
      toast.error(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the project`
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

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: "links",
  });

  const handleProjectImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const currentImages = projectImages || [];
    const newImages = [...currentImages, ...filesArray];

    setValue("project_images", newImages);

    // Create previews for new images
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveProjectImage = (index: number) => {
    const existingImagesCount = existingImages.length;

    // Check if this is an existing image or a new upload
    if (index < existingImagesCount) {
      // This is an existing image - mark it for deletion
      const imageToDelete = existingImages[index];
      setImagesToDelete((prev) => [...prev, imageToDelete.id]);

      // Remove from existing images
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // This is a newly uploaded image - remove from the file array
      const newImageIndex = index - existingImagesCount;
      const newImages = projectImages.filter((_, i) => i !== newImageIndex);
      setValue("project_images", newImages);
    }

    // Remove from previews
    const newPreviews = projectImagePreviews.filter((_, i) => i !== index);
    setProjectImagePreviews(newPreviews);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const filesArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (filesArray.length === 0) return;

    const currentImages = projectImages || [];
    const newImages = [...currentImages, ...filesArray];

    setValue("project_images", newImages);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <Title>{isEditMode ? "Update Project" : "Create New Project"}</Title>
          <Text variant="sm">
            Showcase your portfolio projects describing case study handling
          </Text>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
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
              ? "Update"
              : "Publish"}
          </Button>
        </div>
      </div>

      <form className="grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter your project title"
              />
              {errors.title && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.title.message}
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
              <Label htmlFor="case_study">Case Study</Label>
              <Textarea
                id="case_study"
                {...register("case_study")}
                placeholder="Case study for the projects"
                className="min-h-32"
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
            <Title variant="xs">Project Screens</Title>

            {/* Upload/Drop Zone */}
            <div
              onClick={handleDropZoneClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleProjectImagesChange}
                className="hidden"
              />
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <Title variant="xs">Drop images here or click to upload</Title>
              <Text variant="xs" className="mt-2">
                JPG/ PNG/Webp (Max 5MB each)
              </Text>
            </div>

            {/* Image Previews */}
            {projectImagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {projectImagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
                  >
                    <Image
                      src={preview}
                      alt={`Project screen ${index + 1}`}
                      className="w-full h-full object-cover"
                      height={100}
                      width={100}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProjectImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card className="space-y-6">
            <ImageDropzone
              label="Add a featured Image"
              name="featured_image"
              setValue={(name: string, file: File) =>
                setValue(name as keyof ProjectFormData, file)
              }
              initialImageUrl={initialData?.featured_image_url}
            />
            <div>
              <Label htmlFor="project_type">Project Type *</Label>
              <Controller
                name="project_type"
                control={control}
                rules={{ required: "Project Type is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={initialData?.type || ""}
                  >
                    <SelectTrigger className="w-full !h-11">
                      <SelectValue placeholder="Select a Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web_app">Web App</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project_type && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.project_type.message}
                </Text>
              )}
            </div>
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
            <div>
              <Label>Important Links</Label>
              <div className="space-y-3">
                {linkFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border p-3 rounded-lg border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Controller
                          name={`links.${index}.type`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(val) => field.onChange(val)}
                            >
                              <SelectTrigger className="w-full !h-11">
                                <SelectValue placeholder="Link Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="github">Github</SelectItem>
                                <SelectItem value="live">Live</SelectItem>
                                <SelectItem value="demo">Demo</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Input
                          {...register(`links.${index}.label` as const)}
                          placeholder="Link Title"
                        />
                      </div>
                      {linkFields.length > 1 && (
                        <IconButton
                          icon={Trash2}
                          onClick={() => removeLink(index)}
                        />
                      )}
                    </div>
                    <Input
                      {...register(`links.${index}.url` as const)}
                      placeholder="URL"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => appendLink({ type: "", label: "", url: "" })}
                  className="w-full"
                >
                  <Plus size={14} className="mr-1" /> Add Another Link
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;
