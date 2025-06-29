import React from "react";

import TextButton from "@/components/buttons/text-button";
import HeroText from "@/components/text/hero-text";
import BlogCard from "@/templates/blogs/blog-card";

import { BLOGS } from "@/templates/blogs/_demo-data";
import { useRouter } from "next/navigation";

const Blogs = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/blogs");
  };
  return (
    <section className="container py-12 md:py-20">
      <div className="flbx md:flex-row flex-col">
        <HeroText>Blogs & Articles</HeroText>
        <div className="md:pt-6 hidden md:block">
          <h2 className="text-sm text-gray-400 mb-1">
            {BLOGS?.length - 3} more Articles
          </h2>
          <TextButton onClick={() => handleNavigate()}>Explore Them</TextButton>
        </div>
      </div>
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-6">
        {BLOGS.slice(0, 3)?.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
      <div className="flex md:hidden mt-12 justify-between">
        <h2 className="text-sm text-gray-400">20+ more Articles</h2>
        <TextButton onClick={() => handleNavigate()}>Explore Them</TextButton>
      </div>
    </section>
  );
};

export default Blogs;
