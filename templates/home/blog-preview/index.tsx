import React from "react";

import BlogCard from "@/templates/blogs/blog-card";

import { BLOGS } from "@/templates/blogs/_data";
import { useRouter } from "next/navigation";
import { Title } from "@/components/ui/typography";
import { ChevronRight } from "lucide-react";

const BlogPreview = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/blogs");
  };
  const more_articles = BLOGS?.length - 3;
  return (
    <section className="container py-12 md:py-20">
      <div className="flbx md:flex-row flex-col">
        <Title variant="lg">Blogs & Articles</Title>
        <div className="md:pt-6 hidden md:block">
          {more_articles > 0 && (
            <h2 className="text-sm text-gray-400 mb-1">
              {more_articles} more Article{more_articles > 1 ? "s" : ""}
            </h2>
          )}
          <button
            onClick={() => handleNavigate()}
            className="text-blue-700 dark:text-blue-500 tr group flx gap-2"
          >
            <span>View All</span>
            <ChevronRight className="group-hover:translate-x-2 tr" size={16} />
          </button>
        </div>
      </div>
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-6">
        {BLOGS.slice(0, 3)?.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
      <div className="flex md:hidden mt-12 justify-between">
        {more_articles > 0 && (
          <h2 className="text-gray-400">
            {more_articles} more Article{more_articles > 1 ? "s" : ""}
          </h2>
        )}
        <button
          onClick={() => handleNavigate()}
          className="text-blue-700 dark:text-blue-500 tr group flx gap-2"
        >
          <span>View All</span>
          <ChevronRight className="group-hover:translate-x-2 tr" size={16} />
        </button>
      </div>
    </section>
  );
};

export default BlogPreview;
