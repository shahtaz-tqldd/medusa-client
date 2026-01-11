"use client";

import React, { JSX } from "react";
import moment from "moment";
import Link from "next/link";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Import additional language support as needed
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-sql";

import { Calendar, Clock, Copy, PencilLine } from "lucide-react";
import { Text, Title } from "@/components/ui/typography";
import TechBadge from "@/components/ui/badge";
import { BlogBasicProps, BlogDetailsProps } from "@/lib/api-service/blog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { colors } from "@/lib/colors";

// Updated types to match Django backend structure
export interface TextContent {
  content: string;
}

export interface HeadingContent {
  content: string;
  level: number;
}

export interface CodeContent {
  code: string;
  language: string;
  caption?: string;
  line_numbers?: boolean;
}

export interface ImageContent {
  image: string;
  caption?: string;
  alt_text?: string;
}

export interface QuoteContent {
  content: string;
  source?: string;
}

export interface ListItem {
  content: string;
  order: number;
}

export interface ListContent {
  list_type: "ordered" | "unordered";
  items: ListItem[];
}

export interface BlogContentBlock {
  id: string;
  block_type: "text" | "heading" | "code" | "image" | "quote" | "list";
  order: number;
  text_content?: TextContent;
  heading_content?: HeadingContent;
  code_content?: CodeContent;
  image_content?: ImageContent;
  quote_content?: QuoteContent;
  list_content?: ListContent;
}

type BlogDetailsPageProps = {
  blog: BlogDetailsProps;
  blogs: BlogBasicProps[];
};

const BlogDetailsPage = ({ blog, blogs }: BlogDetailsPageProps) => {
  if (!blog)
    return <div className="container py-80 center">Blog not found</div>;

  const { title, published_at, category, content_blocks, reading_time } = blog;

  return (
    <section className="container flex gap-10 py-20 md:mt-6">
      <div className="w-full md:w-2/3">
        <Title variant="lg">{title}</Title>
        <div className="flex text-sm gap-6 mt-8">
          <TechBadge>{category.name}</TechBadge>
          <p className="opacity-60 flx gap-2">
            <Clock size={14} />
            {reading_time || 7} mins read
          </p>
          <p className="opacity-60 flx gap-2">
            <Calendar size={14} />
            {moment(published_at).format("DD MMM YYYY")}
          </p>
        </div>
        {Array.isArray(content_blocks) ? (
          <RenderBlogs content_blocks={content_blocks as BlogContentBlock[]} />
        ) : (
          <div className="text-red-500">Invalid content blocks</div>
        )}
      </div>

      <aside className="hidden md:block md:w-1/3 space-y-6 sticky top-24 h-fit">
        {blogs.map((blog, index) => (
          <Link href={`/blogs/${blog.slug}`} key={index}>
            <Text variant="sm" className="flx gap-2">
              <PencilLine size={14} />
              {moment(blog.published_at).format("DD MMM YYYY")}
            </Text>
            <Title variant="xs" className="mt-2 mb-4">
              {blog.title}
            </Title>
            <TechBadge color={colors[(index + 1) % colors.length]}>
              {blog.category.name}
            </TechBadge>
          </Link>
        ))}
      </aside>
    </section>
  );
};

export default BlogDetailsPage;

interface RenderBlogsProps {
  content_blocks: BlogContentBlock[];
}

const RenderBlogs: React.FC<RenderBlogsProps> = ({ content_blocks }) => {
  // Helper function to get Prism language
  const getPrismLanguage = (language: string): Prism.Grammar => {
    const languageMap: Record<string, Prism.Grammar> = {
      python: Prism.languages.python || Prism.languages.javascript,
      javaScript: Prism.languages.javascript,
      javascript: Prism.languages.javascript,
      typescript: Prism.languages.typescript || Prism.languages.javascript,
      jsx: Prism.languages.jsx || Prism.languages.javascript,
      tsx: Prism.languages.tsx || Prism.languages.javascript,
      sql: Prism.languages.sql || Prism.languages.javascript,
      html: Prism.languages.html || Prism.languages.markup,
      css: Prism.languages.css || Prism.languages.javascript,
    };

    return languageMap[language] || Prism.languages.javascript;
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied!");
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {content_blocks.map((block, index) => {
        switch (block.block_type) {
          case "text":
            if (block.text_content) {
              return (
                <Text
                  key={block.id || index}
                  className="text-lg leading-relaxed"
                >
                  {block.text_content.content}
                </Text>
              );
            }
            return null;

          case "heading":
            if (block.heading_content) {
              const { content, level } = block.heading_content;
              const HeadingTag = `h${level}` as keyof Pick<
                JSX.IntrinsicElements,
                "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
              >;

              const headingClasses: Record<number, string> = {
                1: "text-4xl font-bold text-slate-800 dark:text-gray-100 mt-12 mb-6",
                2: "text-3xl font-semibold text-slate-800 dark:text-gray-200 mt-10 mb-4",
                3: "text-2xl font-semibold text-slate-700 dark:text-gray-300 mt-8 mb-3",
                4: "text-xl font-semibold text-slate-700 dark:text-gray-300 mt-6 mb-2",
                5: "text-lg font-semibold text-slate-700 dark:text-gray-300 mt-4 mb-2",
                6: "text-base font-semibold text-slate-700 dark:text-gray-300 mt-4 mb-2",
              };

              return (
                <HeadingTag
                  key={block.id || index}
                  className={headingClasses[level] || headingClasses[3]}
                >
                  {content}
                </HeadingTag>
              );
            }
            return null;

          case "code":
            if (block.code_content) {
              const { code, language, caption } = block.code_content;
              const prismLanguage = getPrismLanguage(language);

              return (
                <div key={block.id || index} className="my-8 relative">
                  {caption && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {caption}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-3"
                    onClick={() => handleCopy(code)}
                  >
                    <Copy size={14} className="text-lime-400" />
                    <Text variant="xs" className="!text-lime-400">
                      Copy Code
                    </Text>
                  </Button>
                  <pre
                    className={`language-${language} rounded-2xl !bg-[#121212] !p-8 overflow-x-auto`}
                  >
                    <code
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(code, prismLanguage, language),
                      }}
                    />
                  </pre>
                </div>
              );
            }
            return null;

          case "image":
            if (block.image_content) {
              const { image, caption, alt_text } = block.image_content;

              return (
                <figure key={block.id || index} className="my-8">
                  <Image
                    src={image}
                    alt={alt_text || caption || `Image ${index + 1}`}
                    className="w-full rounded-xl"
                    height={400}
                    width={600}
                  />
                  {caption && (
                    <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400 mt-3">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;

          case "quote":
            if (block.quote_content) {
              const { content, source } = block.quote_content;

              return (
                <blockquote
                  key={block.id || index}
                  className="border-l-4 border-blue-500 pl-6 py-4 my-8 italic"
                >
                  <p className="text-xl text-slate-700 dark:text-gray-300 mb-2">
                    &quot;{content}&quot;
                  </p>
                  {source && (
                    <cite className="text-sm text-slate-600 dark:text-gray-400 not-italic">
                      — {source}
                    </cite>
                  )}
                </blockquote>
              );
            }
            return null;

          case "list":
            if (block.list_content) {
              const { list_type, items } = block.list_content;

              // Sort items by order
              const sortedItems = [...items].sort((a, b) => a.order - b.order);

              const ListTag = list_type === "ordered" ? "ol" : "ul";
              const listClass =
                list_type === "ordered"
                  ? "list-decimal space-y-2 pl-6 text-slate-600 dark:text-gray-400 text-lg"
                  : "list-disc space-y-2 pl-6 text-slate-600 dark:text-gray-400 text-lg";

              return (
                <ListTag key={block.id || index} className={listClass}>
                  {sortedItems.map((item, i) => (
                    <li key={i}>{item.content}</li>
                  ))}
                </ListTag>
              );
            }
            return null;

          default:
            console.warn(`Unknown block type: ${block.block_type}`);
            return null;
        }
      })}
    </div>
  );
};
