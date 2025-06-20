import React from "react";
import Image from "next/image";
import Link from "next/link";

import LordIcon from "@/assets/icons/lord-icon";
import { Ellipsis } from "lucide-react";
import { slugify } from "@/lib/slugify";
import Capsule from "@/components/status/capsule";
import IconButton from "@/components/buttons/icon-button";

type BlogData = {
  img: string;
  title: string;
  body: string;
  published: string;
  topic: string;
};

type BlogCardProps = {
  data: BlogData;
  index: number;
};

const BlogCard: React.FC<BlogCardProps> = ({ data, index }) => {
  const { img, title, body, published, topic } = data;
  const handleSave = () => {};
  return (
    <div>
      <Image
        src={img}
        height={500}
        width={700}
        className="w-full h-60 object-cover rounded-3xl"
        alt={slugify(title)}
      />
      <Link href={`/blogs/${slugify(title)}`} className="block pt-4 px-1">
        <Capsule
          size="sm"
          variant={
            topic.toLocaleLowerCase() === "docker"
              ? "success"
              : topic.toLocaleLowerCase() === "react js"
              ? "primary"
              : "warning"
          }
        >
          {topic}
        </Capsule>
        <h2 className="text-xl font-medium mt-2.5 dark:text-gray-300 text-slate-800">
          {title}
        </h2>
        <p className="mt-2 dark:text-gray-400 text-slate-600 line-clamp-2">
          {body}
        </p>
      </Link>
      <div className="flbx mt-6 px-1">
        <p className="dark:text-white/60 text-slate-600 text-sm">
          Published on {published}
        </p>
        <div className="flx gap-3">
          <IconButton onClick={handleSave} icon={Ellipsis} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
