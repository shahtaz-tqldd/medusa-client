"use client";

import React, { useState } from "react";
import moment from "moment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Text, Title } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, Save, Trash2, X } from "lucide-react";
import { createExperience } from "@/lib/api-service/experience-action";

export interface ExperienceFormData {
  position: string;
  details: string;
  highlights: { content: string }[];
  key_contributions: { content: string }[];
  tech_stacks: string[];
  started_at: Date;
  ended_at?: Date;
  company_name: string;
  company_location: string;
  company_website: string;
}

const CreateExperiencePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    defaultValues: {
      highlights: [{ content: "" }],
      key_contributions: [{ content: "" }],
      tech_stacks: [],
    },
  });

  const onSubmit = async (data: ExperienceFormData) => {
    setIsSubmitting(true);

    try {
      // Process highlights and key contributions
      const processedData = {
        ...data,
        highlights: data.highlights
          .filter((h) => h.content?.trim() !== "")
          .map((h) => h.content),
        key_contributions: data.key_contributions
          .filter((k) => k.content?.trim() !== "")
          .map((k) => k.content),
        started_at: moment(data.started_at).format("YYYY-MM-DD"),
        ended_at: isCurrentlyWorking
          ? null
          : moment(data.ended_at).format("YYYY-MM-DD"),
      };

      const res = await createExperience(processedData);

      if (res?.success) {
        toast.success("Experience Created Successfully!");
        router.push("/admin/experiences");
      } else {
        toast.error(res?.message || "Failed to create Experience");
      }
    } catch (error) {
      console.error("Experience creation error:", error);
      toast.error("An error occurred while creating the experience");
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: contributionFields,
    append: appendContribution,
    remove: removeContribution,
  } = useFieldArray({
    control,
    name: "key_contributions",
  });

  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <Title>Create New Experience</Title>
          <Text variant="sm">
            Add your professional experience and achievements
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

      <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
        {/* Left Column - Main Details */}
        <div className="md:col-span-3 space-y-4">
          <Card className="space-y-6">
            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                {...register("position", { required: "Position is required" })}
                placeholder="e.g., Senior Software Engineer"
              />
              {errors.position && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.position.message}
                </Text>
              )}
            </div>

            <div>
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                {...register("details")}
                placeholder="Describe your role and responsibilities"
                className="min-h-32"
              />
            </div>

            <div>
              <Label>Highlights</Label>
              <div className="space-y-2">
                {highlightFields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input
                      {...register(`highlights.${index}.content` as const)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1"
                    />
                    {highlightFields.length > 1 && (
                      <IconButton
                        icon={Trash2}
                        onClick={() => removeHighlight(index)}
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => appendHighlight({ content: "" })}
                >
                  <Plus size={14} className="mr-1" /> Add Highlight
                </Button>
              </div>
            </div>

            <div>
              <Label>Key Contributions</Label>
              <div className="space-y-2">
                {contributionFields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input
                      {...register(
                        `key_contributions.${index}.content` as const
                      )}
                      placeholder={`Contribution ${index + 1}`}
                      className="flex-1"
                    />
                    {contributionFields.length > 1 && (
                      <IconButton
                        icon={Trash2}
                        onClick={() => removeContribution(index)}
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => appendContribution({ content: "" })}
                >
                  <Plus size={14} className="mr-1" /> Add Contribution
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Company & Timeline */}
        <div className="md:col-span-2 space-y-4">
          <Card className="space-y-6">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                {...register("company_name", {
                  required: "Company name is required",
                })}
                placeholder="Enter company name"
              />
              {errors.company_name && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.company_name.message}
                </Text>
              )}
            </div>

            <div>
              <Label htmlFor="company_location">Company Location *</Label>
              <Input
                id="company_location"
                {...register("company_location", {
                  required: "Company location is required",
                })}
                placeholder="e.g., San Francisco, CA"
              />
              {errors.company_location && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.company_location.message}
                </Text>
              )}
            </div>

            <div>
              <Label htmlFor="company_website">Company Website</Label>
              <Input
                id="company_website"
                {...register("company_website", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message:
                      "Please enter a valid URL starting with http:// or https://",
                  },
                })}
                placeholder="https://example.com"
              />
              {errors.company_website && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.company_website.message}
                </Text>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="started_at">Start Date *</Label>
                <Input
                  id="started_at"
                  type="date"
                  {...register("started_at", {
                    required: "Start date is required",
                    valueAsDate: true,
                  })}
                  max={moment().format("YYYY-MM-DD")}
                />
                {errors.started_at && (
                  <Text variant="sm" className="text-red-500 mt-1">
                    {errors.started_at.message}
                  </Text>
                )}
              </div>
              {!isCurrentlyWorking && (
                <div>
                  <Label htmlFor="ended_at">End Date *</Label>
                  <Input
                    id="ended_at"
                    type="date"
                    {...register("ended_at", {
                      required: !isCurrentlyWorking
                        ? "End date is required"
                        : false,
                      valueAsDate: true,
                      validate: (value) => {
                        const startDate = watch("started_at");
                        if (
                          !isCurrentlyWorking &&
                          value &&
                          startDate &&
                          moment(value).isBefore(moment(startDate))
                        ) {
                          return "End date must be after start date";
                        }
                        return true;
                      },
                    })}
                    max={moment().format("YYYY-MM-DD")}
                  />
                  {errors.ended_at && (
                    <Text variant="sm" className="text-red-500 mt-1">
                      {errors.ended_at.message}
                    </Text>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="currently_working"
                checked={isCurrentlyWorking}
                onCheckedChange={(checked) => {
                  setIsCurrentlyWorking(checked === true);
                  if (checked) {
                    setValue("ended_at", undefined);
                  }
                }}
              />
              <Label
                htmlFor="currently_working"
                className="cursor-pointer font-normal !mb-0"
              >
                I currently work here
              </Label>
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
                      placeholder="Type a tech stack and press Enter"
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
      </div>
    </div>
  );
};

export default CreateExperiencePage;
