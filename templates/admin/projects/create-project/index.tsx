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
import { createProject } from "@/lib/api-service/projects";
import { Plus, Save, Trash2, X, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

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

const CreateProjectPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [projectImagePreviews, setProjectImagePreviews] = useState<string[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      features: [{ content: "" }],
      links: [{ type: "", label: "", url: "" }],
      tech_stacks: [],
      project_images: [],
    },
  });

  const projectImages = watch("project_images") || [];

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Append simple fields
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("case_study", data.case_study || "");
      formData.append("type", data.project_type || "");

      // Append featured image
      if (data.featured_image) {
        formData.append("featured_image", data.featured_image);
      }

      // Append project images (Django expects multiple files with same key)
      if (data.project_images && data.project_images.length > 0) {
        data.project_images.forEach((file) => {
          formData.append("project_images", file);
        });
      }

      // Append tech stacks as JSON string
      formData.append("tech_stacks", JSON.stringify(data.tech_stacks || []));

      // Append features as JSON string
      const features = data.features
        .filter((f) => f.content.trim() !== "")
        .map((f) => f.content);
      formData.append("features", JSON.stringify(features));

      // Append links as JSON string
      const links = data.links.filter(
        (link) => link.type && link.label && link.url
      );
      formData.append("links", JSON.stringify(links));

      const res = await createProject(formData);

      if (res?.success) {
        toast.success("Project Created Successfully!");
        router.push("/admin/projects");
      } else {
        toast.error(res?.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error("An error occurred while creating the project");
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

    // Create previews
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveProjectImage = (index: number) => {
    const newImages = projectImages.filter((_, i) => i !== index);
    setValue("project_images", newImages);

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
          <Title>Create New Project</Title>
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
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <form className="grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card>
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

          <Card>
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
          <Card>
            <ImageDropzone
              label="Add a featured Image"
              name="featured_image"
              setValue={(name: string, file: File) =>
                setValue(name as keyof ProjectFormData, file)
              }
            />
            <div>
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="project_type"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full !h-11">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="web_app">Web App</SelectItem>
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
