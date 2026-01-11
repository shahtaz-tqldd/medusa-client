"use client";

import React, { useState } from "react";
import BlogCard from "./blog-card";
import { Title } from "@/components/ui/typography";
import { BlogBasicProps } from "@/lib/api-service/blog";
import { Search } from "lucide-react";

interface BlogPageProps {
  blogs: BlogBasicProps[];
}

const BlogPage = ({ blogs }: BlogPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="container py-20">
      <div className="flbx md:flex-row flex-col mt-6">
        <Title variant="lg">Blogs and Articles</Title>
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
        {blogs.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
