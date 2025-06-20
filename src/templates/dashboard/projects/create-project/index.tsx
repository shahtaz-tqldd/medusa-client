"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input, TextArea } from "@/components/ui/input";
import Button from "@/components/buttons/primary-button";
import PageTitle from "@/components/reusable/page-title";
import {
  Upload,
  X,
  Plus,
  Tag,
  Layers,
  Github,
  Link,
  Shapes,
  Text,
  ChartNoAxesGantt,
  Calendar,
} from "lucide-react";
import PrimaryCard from "@/components/cards/primary-card";
import Capsule from "@/components/status/capsule";
import IconButton from "@/components/buttons/icon-button";

type ProjectFormValues = {
  name: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  images: File[];
  tech_stacks: string[];
  features: string[];
  live_url: string;
  github_url: string;
};

export default function CreateProjectForm() {
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: "",
      description: "",
      type: "",
      start_date: "",
      end_date: "",
      images: [],
      tech_stacks: [],
      features: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentImages = form.getValues("images");

    if (currentImages.length + files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    const newImages = [...currentImages, ...files];
    form.setValue("images", newImages);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("images", newImages);

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  const addTechStack = () => {
    if (techStackInput.trim()) {
      const currentStacks = form.getValues("tech_stacks");
      if (!currentStacks.includes(techStackInput.trim())) {
        form.setValue("tech_stacks", [...currentStacks, techStackInput.trim()]);
      }
      setTechStackInput("");
    }
  };

  const removeTechStack = (stack: string) => {
    const currentStacks = form.getValues("tech_stacks");
    form.setValue(
      "tech_stacks",
      currentStacks.filter((s) => s !== stack)
    );
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features");
      if (!currentFeatures.includes(featureInput.trim())) {
        form.setValue("features", [...currentFeatures, featureInput.trim()]);
      }
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    const currentFeatures = form.getValues("features");
    form.setValue(
      "features",
      currentFeatures.filter((f) => f !== feature)
    );
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append text fields
      Object.entries(values).forEach(([key, value]) => {
        if (key === "images") {
          // Append images
          values.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        } else if (Array.isArray(value)) {
          // Append arrays as JSON
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      console.log("Submitting project:", values);
      // await axios.post("/api/projects", formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
    } catch (err) {
      console.error("Error creating project", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flbx mb-12">
          <PageTitle>Create New Project</PageTitle>

          {/* Submit */}
          <div className="flx gap-2">
            <Button type="submit" variant="secondary">
              Save Draft
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
          {/* Left Column - Project Info */}
          <div className="col-span-3 space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <ChartNoAxesGantt className="h-4 w-4" />
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ecommerce site with good project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <Text className="h-4 w-4" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <TextArea
                      placeholder="this project is very nice"
                      {...field}
                      className="h-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <Shapes className="h-4 w-4" />
                    Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="software / marketing / research"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Features */}
            <div className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Features
              </FormLabel>
              <div className="flex w-full gap-2">
                <Input
                  placeholder="e.g. User Authentication, Real-time Chat"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addFeature}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1 mt-4">
                {form.watch("features").map((feature, index) => (
                  <div key={index} className="flbx text-sm opacity-60">
                    <span className="flex-1">
                      {index + 1}. {feature}
                    </span>
                    <IconButton
                      onClick={() => removeFeature(feature)}
                      icon={X}
                    />
                  </div>
                ))}
              </div>
              {form.watch("features").length === 0 && (
                <p className="text-xs text-gray-500 italic">
                  No features added yet. Add key features of your project.
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Images, Tech Stack, Features */}
          <div className="col-span-2 space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Project Images
              </FormLabel>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <PrimaryCard
                    key={index}
                    className="px-0 py-0 h-32 overflow-hidden"
                  >
                    {imagePreviews[index] ? (
                      <div className="relative h-32">
                        <img
                          src={imagePreviews[index]}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer m-4 h-24 flex flex-col items-center justify-center border border-dashed border-gray-500 rounded-xl hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-500 text-center">
                          Upload Image {index + 1}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={imagePreviews.length >= 4}
                        />
                      </label>
                    )}
                  </PrimaryCard>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Upload up to 4 images (JPG, PNG, max 5MB each)
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tech Stack
              </FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechStack())
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addTechStack}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("tech_stacks").map((stack, index) => (
                  <Capsule
                    key={index}
                    variant="success"
                    className="flex items-center gap-1 pr-1"
                  >
                    {stack}
                    <button
                      type="button"
                      onClick={() => removeTechStack(stack)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Capsule>
                ))}
              </div>
            </div>

            {/* Live URL */}
            <FormField
              control={form.control}
              name="live_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Demo URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Live URL Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Live URL */}
            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    Github URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Github Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
