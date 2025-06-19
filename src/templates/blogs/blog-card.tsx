import React from "react";
import Image from "next/image";
import Link from "next/link";

import LordIcon from "@/assets/icons/lord-icon";
import { Ellipsis } from "lucide-react";
import { slugify } from "@/lib/slugify";

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
  const colors = [
    "bg-blue-500/15 dar:bg-blue-500/30 text-blue-500",
    "bg-green-500/15 dar:bg-green-500/30 text-green-500",
    "bg-yellow-500/15 dar:bg-yellow-500/30 text-yellow-500",
  ];
  return (
    <div>
      <Image
        src={img}
        height={500}
        width={700}
        className="w-full h-60 object-cover rounded-3xl"
        alt=""
      />
      <Link href={`/blogs/${slugify(title)}`}>
        <p
          className={`pt-1.5 pb-1 px-3 rounded-full text-xs w-fit mt-4 ${colors[index]}`}
        >
          {topic}
        </p>
        <h2 className="text-xl font-medium mt-2 dark:text-gray-300 text-slate-800">{title}</h2>
        <p className="mt-2 dark:text-gray-400 text-slate-600 line-clamp-2">{body}</p>
      </Link>
      <div className="flbx mt-6">
        <p className="opacity-60  text-sm">{published}</p>
        <div className="flx gap-3">
          <button className="center">
            <LordIcon
              icon="olmrexol"
              height={18}
              width={18}
              target="button"
              primary="#2b7fff"
            />
          </button>
          <button className="h-8 w-8 center rounded-full bg-orange-500/5 dark:bg-white/5 dark:hover:bg-white/10 hover:bg-orange-600/10 tr">
            <Ellipsis className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
