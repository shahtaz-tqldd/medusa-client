import React from "react";
import { BLOGS } from "./_demo-data";
import BlogCard from "./blog-card";
import HeroText from "@/components/text/hero-text";
import { Search } from "lucide-react";

const BlogPage = () => {
  return (
    <section className="container py-20">
      <div className="flbx mt-12">
        <HeroText>Blogs</HeroText>
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search blogs"
            className="py-2 pl-9 pr-4 w-full rounded-full border dark:border-white/20 border-black/10 outline-none"
            autoFocus
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 opacity-50" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8">
        {BLOGS.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
