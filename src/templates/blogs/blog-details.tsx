import React from "react";
import Link from "next/link";

import { BLOGS } from "./demo-data";

import { slugify } from "@/lib/slugify";
import { colors } from "@/lib/colors";
import { Calendar, Clock } from "lucide-react";

type Props = {
  name: string;
};

const BlogDetailsPage: React.FC<Props> = ({ name }) => {
  const blog = BLOGS.find((b) => slugify(b.title) === name);

  if (!blog)
    return <div className="container py-80 center">Blog not found</div>;

  const { img, title, body, published, topic } = blog;

  return (
    <section className="container flex gap-10 py-20 mt-8">
      <div className="lg:w-2/3">
        <h2 className="text-5xl font-medium opacity-90 leading-[60px]">{title}</h2>
        <div className="flx text-sm gap-6 mt-8">
          <p
            className={`${colors[1]} py-1.5 px-3 rounded-full`}
          >
            {topic}
          </p>
          <p className="opacity-60 flx gap-2">
            <Clock size={14} />4 mins read
          </p>
          <p className="opacity-60 flx gap-2">
            <Calendar size={14} />
            {published}
          </p>
        </div>
        <p className="opacity-75 mt-5">{body}</p>
      </div>
      <div className="lg:w-1/3 flex flex-col gap-10 sticky top-20 mt-3">
        {BLOGS.filter((b) => slugify(b.title) !== name)?.map((data, index) => (
          <Link key={index} href={`/blogs/${slugify(data?.title)}`}>
            <div className="flx gap-4 text-sm">
              <p className="opacity-60">{data.published}</p>

              <p
                className={`${colors[index]} text-xs pt-1.5 pb-1 px-3 rounded-full`}
              >
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
