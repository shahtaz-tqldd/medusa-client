import React from "react";
import TextButton from "@/components/buttons/text-button";
import HeroText from "@/components/text/hero-text";
import BlogCard from "@/templates/blogs/blog-card";
import { BLOGS } from "@/templates/blogs/_demo-data";


const Blogs = () => {
  const handleNavigate = () => {};
  return (
    <section className="container pb-32">
      <div className="flbx">
        <HeroText>Blogs & Articles</HeroText>
        <div className="pt-6">
          <h2 className="text-sm text-gray-400 mb-1">20+ more Articles</h2>
          <TextButton onClick={handleNavigate}>Explore Them</TextButton>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS.slice(0, 3)?.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
