import React from "react";
import { BLOGS } from "./demo-data";
import { slugify } from "@/lib/slugify";
import { Dot } from "lucide-react";
import Link from "next/link";

type Props = {
  name: string;
};

const BlogDetailsPage: React.FC<Props> = ({ name }) => {
  const blog = BLOGS.find((b) => slugify(b.title) === name);

  if (!blog) return <div>Blog not found</div>;

  const { img, title, body, published, topic } = blog;

  const colors = [
    "bg-blue-500/15 dar:bg-blue-500/30 text-blue-500",
    "bg-green-500/15 dar:bg-green-500/30 text-green-500",
    "bg-yellow-500/15 dar:bg-yellow-500/30 text-yellow-500",
  ];
  return (
    <section className="container flex gap-10 py-20 mt-8">
      <div className="lg:w-2/3">
        <p className={`py-1 px-3 rounded-full text-xs w-fit ${colors[0]}`}>
          {topic}
        </p>
        <h2 className="text-4xl font-medium mt-2">{title}</h2>
        <p className="opacity-75 mt-5">{body}</p>
      </div>
      <div className="lg:w-1/3 flex flex-col gap-10 sticky top-20 mt-5">
        {BLOGS.filter((b) => slugify(b.title) !== name)?.map((data, index) => (
          <Link key={index} href={`/blogs/${slugify(data?.title)}`}>
            <div className="flx gap-4 text-sm">
              <p className="opacity-60">{data.published}</p>

              <p className={`${colors[index]} text-xs py-1 px-3 rounded-full`}>
                {data.topic}
              </p>
            </div>
            <h2 className="text-xl font-medium">{data.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogDetailsPage;
