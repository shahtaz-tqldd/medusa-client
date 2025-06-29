"use client";

import React, { useState } from "react";
import { BLOGS } from "./_demo-data";
import BlogCard from "./blog-card";
import HeroText from "@/components/text/hero-text";
import { Search } from "lucide-react";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter blogs based on title or tags matching the search term
  const filteredBlogs = BLOGS.filter((blog) => {
    const titleMatch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch = blog.tags?.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return titleMatch || tagMatch;
  });

  return (
    <section className="container py-20">
      <div className="flbx mt-6">
        <HeroText className="-translate-y-4">Blogs</HeroText>
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pl-9 pr-4 w-full rounded-full border dark:border-white/20 border-black/10 outline-none"
            autoFocus
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 opacity-50" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((data, index) => (
            <BlogCard key={index} data={data} index={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No blogs found.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
