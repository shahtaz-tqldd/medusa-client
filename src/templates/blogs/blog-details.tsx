import React from "react";
import Link from "next/link";

import { BLOGS } from "./_demo-data";

import { slugify } from "@/lib/slugify";
import { colors } from "@/lib/colors";
import { Calendar, Clock } from "lucide-react";
import { HeaderText } from "@/components/text/title-text";
import BodyText from "@/components/text/body-text";
import { BlogContentBlock } from "./_types";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; //

type Props = {
  name: string;
};

const BlogDetailsPage: React.FC<Props> = ({ name }) => {
  const blog = BLOGS.find((b) => slugify(b.title) === name);

  if (!blog)
    return <div className="container py-80 center">Blog not found</div>;

  const { title, published, topic, content } = blog;

  return (
   <section className="container flex gap-10 py-20 md:mt-6">
  <div className="w-full md:w-2/3">
    <h2 className="leading-[32px] md:leading-[48px] text-2xl md:text-4xl font-medium mt-4 dark:text-gray-300 text-slate-800">{title}</h2>
    <div className="flex text-sm gap-6 mt-8">
      <p className={`${colors[1]} py-1.5 px-3 rounded-full`}>{topic}</p>
      <p className="opacity-60 flx gap-2">
        <Clock size={14} />4 mins read
      </p>
      <p className="opacity-60 flx gap-2">
        <Calendar size={14} />
        {published}
      </p>
    </div>
    <RenderBlogs content={content} />
  </div>

  <aside className="hidden md:block md:w-1/3">
    <div className="fixed top-28 space-y-10 max-h-[60vh] w-1/4">
      {BLOGS.filter((b) => slugify(b.title) !== name)?.map((data, index) => (
        <Link
          key={index}
          className="block"
          href={`/blogs/${slugify(data?.title)}`}
        >
          <div className="flx gap-4 text-sm">
            <p className="opacity-60">{data.published}</p>
            <p
              className={`${colors[index]} text-xs pt-1.5 pb-1 px-3 rounded-full`}
            >
              {data.topic}
            </p>
          </div>
          <HeaderText className="mt-2">{data?.title}</HeaderText>
        </Link>
      ))}
    </div>
  </aside>
</section>

  );
};

export default BlogDetailsPage;

interface RenderBlogsProps {
  content: BlogContentBlock[];
}
const RenderBlogs: React.FC<RenderBlogsProps> = ({ content }) => {
  return (
    <div className="mt-8 space-y-6">
      {content.map((block, index) => {
        switch (block.type) {
          case "text_content":
          case "heading_content":
          case "quote_content":
            if (typeof block.value === "string") {
              const className =
                block.type === "heading_content"
                  ? "text-2xl font-semibold text-slate-800 dark:text-gray-200 mt-10 mb-4"
                  : block.type === "quote_content"
                  ? "border-l-4 border-blue-500 pl-4 italic text-slate-600 dark:text-gray-400"
                  : "text-lg";

              const Wrapper = block.type === "heading_content" ? "h2" : block.type === "quote_content" ? "blockquote" : BodyText;

              return (
                <Wrapper key={index} className={className}>
                  {block.value}
                </Wrapper>
              );
            }
            return null;

          case "code_content":
            if (typeof block.value === "string") {
              return (
                <div className="my-10" key={index}>
                  <pre className="language-javascript rounded-xl">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                          block.value,
                          Prism.languages.javascript,
                          "javascript"
                        ),
                      }}
                    />
                  </pre>
                </div>
              );
            }
            return null;

          case "image_content":
            if (typeof block.value === "string") {
              return (
                <img
                  key={index}
                  src={block.value}
                  alt={`blog-image-${index}`}
                  className="w-full rounded-xl"
                />
              );
            }
            return null;

          case "list_content":
            if (Array.isArray(block.value)) {
              return (
                <ul
                  key={index}
                  className="list-disc space-y-2 pl-6 text-slate-600 dark:text-gray-400"
                >
                  {block.value.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
};
