"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Code,
  Type,
  Quote,
  List,
  Heading,
  ArrowDown,
  ArrowUp,
  X,
} from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import ImageDropzone from "@/components/ui/image-upload";
import { BlogCategory, createBlog } from "@/lib/api-service/blog";
import { useRouter } from "next/navigation";
import AddCategoryDialog from "./add-category-dialog";
import { toast } from "sonner";

// Types matching your Django models
interface ContentBlock {
  block_type: "text" | "heading" | "code" | "image" | "quote" | "list";
  content?: string;
  level?: number;
  code?: string;
  language?: string;
  caption?: string;
  image?: File;
  alt_text?: string;
  source?: string;
  list_type?: "ordered" | "unordered";
  items?: { content: string }[];
}

interface BlogFormData {
  title: string;
  subtitle?: string;
  excerpt?: string;
  featured_image?: File;
  status: "draft" | "published";
  category: string;
  tags: string[];
  content_blocks: ContentBlock[];
}

interface CreateBlogProps {
  categories: BlogCategory[];
}

const CreateBlogPage = ({ categories }: CreateBlogProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [categoryAddDialogOpen, setCategoryAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      status: "draft",
      tags: [],
      content_blocks: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "content_blocks",
  });

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("title", data.title);
      if (data.subtitle) formData.append("subtitle", data.subtitle);
      if (data.excerpt) formData.append("excerpt", data.excerpt);
      formData.append("status", data.status);
      formData.append("category", data.category);

      // Append featured image
      if (data.featured_image) {
        formData.append("featured_image", data.featured_image);
      }

      // Append tags - send as array items
      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => {
          formData.append("tags", tag);
        });
      }

      // Process content blocks
      const processedBlocks: {
        block_type: string;
        order: number;
        [key: string]: string | number | boolean | object | undefined;
      }[] = [];

      data.content_blocks.forEach((block, index) => {
        const processedBlock: {
          block_type: string;
          order: number;
          text_content?: { content: string };
          heading_content?: { content: string; level: number };
          code_content?: {
            code: string;
            language: string;
            caption: string;
            line_numbers: boolean;
          };
          image_content?: { caption: string; alt_text: string };
          quote_content?: { content: string; source: string };
          list_content?: {
            list_type: string;
            items: { content: string; order: number }[];
          };
        } = {
          block_type: block.block_type,
          order: index + 1,
        };

        switch (block.block_type) {
          case "text":
            processedBlock.text_content = {
              content: block.content || "",
            };
            break;

          case "heading":
            processedBlock.heading_content = {
              content: block.content || "",
              level: block.level || 2,
            };
            break;

          case "code":
            processedBlock.code_content = {
              code: block.code || "",
              language: block.language || "python",
              caption: block.caption || "",
              line_numbers: true,
            };
            break;

          case "image":
            if (block.image) {
              // For images, we need to handle the file separately
              formData.append(
                `content_blocks[${index}]image_content.image`,
                block.image
              );
              processedBlock.image_content = {
                caption: block.caption || "",
                alt_text: block.alt_text || "",
              };
            }
            break;

          case "quote":
            processedBlock.quote_content = {
              content: block.content || "",
              source: block.source || "",
            };
            break;

          case "list":
            processedBlock.list_content = {
              list_type: block.list_type || "unordered",
              items:
                block.items?.map((item, itemIndex) => ({
                  content: item.content,
                  order: itemIndex,
                })) || [],
            };
            break;
        }

        processedBlocks.push(processedBlock);
      });

      // Append content_blocks as JSON string
      formData.append("content_blocks", JSON.stringify(processedBlocks));

      const res = await createBlog(formData);

      if (res?.success) {
        toast.success("Blog Created Successfully!");
        router.push("/admin/blogs");
      } else {
        toast.error(res?.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Blog creation error:", error);
      toast.error("An error occurred while creating the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBlock = (blockType: ContentBlock["block_type"]) => {
    const newBlock: ContentBlock = {
      block_type: blockType,
    };

    switch (blockType) {
      case "text":
        newBlock.content = "";
        break;
      case "heading":
        newBlock.content = "";
        newBlock.level = 2;
        break;
      case "code":
        newBlock.code = "";
        newBlock.language = "python";
        newBlock.caption = "";
        break;
      case "quote":
        newBlock.content = "";
        newBlock.source = "";
        break;
      case "list":
        newBlock.list_type = "unordered";
        newBlock.items = [{ content: "" }];
        break;
    }

    append(newBlock);
  };

  const renderBlockContent = (index: number, block: ContentBlock) => {
    switch (block.block_type) {
      case "text":
        return (
          <Textarea
            {...register(`content_blocks.${index}.content` as const)}
            placeholder="Write your paragraph..."
            className="min-h-[100px] !border-none focus-visible:!ring-transparent"
          />
        );

      case "heading":
        return (
          <div className="flx gap-2">
            <Controller
              name={`content_blocks.${index}.level`}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(parseInt(val))}
                >
                  <SelectTrigger className="w-24 !h-11">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              {...register(`content_blocks.${index}.content` as const)}
              placeholder="Heading text..."
              className="!border-none focus-visible:!ring-transparent"
            />
          </div>
        );

      case "code":
        return (
          <div className="space-y-2">
            <Textarea
              {...register(`content_blocks.${index}.code` as const)}
              placeholder="Paste your code here..."
              className="min-h-[150px] font-mono text-sm !border-none focus-visible:!ring-transparent !shadow-none"
            />
            <div className="flex gap-2">
              <Controller
                name={`content_blocks.${index}.language`}
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger className="w-1/2 !h-11">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javaScript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                {...register(`content_blocks.${index}.caption` as const)}
                placeholder="Caption (optional)"
                className="flex-1"
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            <div className="p-2">
              <Controller
                name={`content_blocks.${index}.image`}
                control={control}
                render={({ field }) => (
                  <ImageDropzone
                    label="Add Image"
                    name={`content_blocks.${index}.image`}
                    setValue={(name: string, file: File) => {
                      field.onChange(file);
                    }}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 p-2">
              <Input
                {...register(`content_blocks.${index}.caption` as const)}
                placeholder="Image caption (optional)"
              />
              <Input
                {...register(`content_blocks.${index}.alt_text` as const)}
                placeholder="Alt text for accessibility"
              />
            </div>
          </div>
        );

      case "quote":
        return (
          <div className="space-y-2">
            <Textarea
              {...register(`content_blocks.${index}.content` as const)}
              placeholder="Quote text..."
              className="min-h-[80px] !text-lg italic !border-none focus-visible:!ring-transparent !shadow-none"
            />
            <Input
              {...register(`content_blocks.${index}.source` as const)}
              placeholder="Source (optional)"
              className="!border-none focus-visible:!ring-transparent"
            />
          </div>
        );

      case "list":
        return <ListBlockController blockIndex={index} />;

      default:
        return null;
    }
  };

  // Separate component for list blocks to handle useFieldArray properly
  const ListBlockController = ({ blockIndex }: { blockIndex: number }) => {
    const {
      fields: listFields,
      append: appendItem,
      remove: removeItem,
    } = useFieldArray({
      control,
      name: `content_blocks.${blockIndex}.items` as const,
    });

    return (
      <div className="space-y-2 p-2">
        <Controller
          name={`content_blocks.${blockIndex}.list_type`}
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="List Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unordered">Unordered (Bullets)</SelectItem>
                <SelectItem value="ordered">Ordered (Numbers)</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <div className="space-y-2">
          {listFields.map((item, itemIndex) => (
            <div key={item.id} className="flex items-center gap-2">
              <Input
                {...register(
                  `content_blocks.${blockIndex}.items.${itemIndex}.content` as const
                )}
                placeholder={`Item ${itemIndex + 1}`}
                className="flex-1"
              />
              {listFields.length > 1 && (
                <IconButton
                  icon={Trash2}
                  onClick={() => removeItem(itemIndex)}
                />
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => appendItem({ content: "" })}
          >
            <Plus size={14} className="mr-1" /> Add Item
          </Button>
        </div>
      </div>
    );
  };

  const getBlockIcon = (blockType: string) => {
    switch (blockType) {
      case "text":
        return <Type size={16} />;
      case "heading":
        return <Heading size={16} />;
      case "code":
        return <Code size={16} />;
      case "image":
        return <ImageIcon size={16} />;
      case "quote":
        return <Quote size={16} />;
      case "list":
        return <List size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Title>Write a New Article</Title>
          <Text variant="sm">
            Technical articles to publish on your portfolio
          </Text>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit((data) =>
              onSubmit({ ...data, status: "draft" })
            )}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={handleSubmit((data) =>
              onSubmit({ ...data, status: "published" })
            )}
            disabled={isSubmitting}
          >
            <Save size={14} className="mr-2" />
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-5 gap-5">
          {/* Content Blocks */}
          <Card className="col-span-3 h-fit">
            <Title variant="xs" className="-mt-1">
              Content
            </Title>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden"
              >
                <div className="dark:bg-[#111] bg-blue-50 py-1.5 px-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getBlockIcon(field.block_type)}
                      <span className="font-medium capitalize text-sm">
                        {field.block_type}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {index > 0 && (
                        <IconButton
                          onClick={() => move(index, index - 1)}
                          icon={ArrowUp}
                        />
                      )}
                      {index < fields.length - 1 && (
                        <IconButton
                          onClick={() => move(index, index + 1)}
                          icon={ArrowDown}
                        />
                      )}
                      <IconButton onClick={() => remove(index)} icon={Trash2} />
                    </div>
                  </div>
                </div>
                <div className="p-2 dark:bg-[#1a1a1a] bg-transparent">
                  {renderBlockContent(index, field)}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("text")}
              >
                <Type size={14} className="mr-1" /> Text
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("heading")}
              >
                <Heading size={14} className="mr-1" /> Heading
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("code")}
              >
                <Code size={14} className="mr-1" /> Code
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("image")}
              >
                <ImageIcon size={14} className="mr-1" /> Image
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("quote")}
              >
                <Quote size={14} className="mr-1" /> Quote
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => addBlock("list")}
              >
                <List size={14} className="mr-1" /> List
              </Button>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="col-span-2 h-fit">
            <ImageDropzone
              label="Add a featured Image"
              name="featured_image"
              setValue={(name: string, file: File) =>
                setValue(name as keyof BlogFormData, file)
              }
            />
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.title.message}
                </Text>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register("excerpt")}
                placeholder="Short description for SEO and previews"
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full !h-11">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <button
                        onClick={() => setCategoryAddDialogOpen(true)}
                        className="flex items-center gap-2 py-1.5 px-2 hover:dark:bg-white/5 hover:bg-blue-100 rounded-md w-full text-sm"
                      >
                        <Plus size={14} /> Add Category
                      </button>
                      <SelectSeparator />
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <Text variant="sm" className="text-red-500 mt-1">
                  {errors.category.message}
                </Text>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Controller
                name="tags"
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

                          // prevent duplicates
                          if (field.value.includes(value)) {
                            setInputValue("");
                            return;
                          }

                          field.onChange([...field.value, value]);
                          setInputValue("");
                        }
                      }}
                    />

                    {/* Tags Display */}
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
      <AddCategoryDialog
        open={categoryAddDialogOpen}
        setOpen={setCategoryAddDialogOpen}
      />
    </div>
  );
};

export default CreateBlogPage;
