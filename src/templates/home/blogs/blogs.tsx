import LordIcon from "@/assets/icons/lord-icon";
import HeroText from "@/components/text/hero-text";
import BlogCard from "@/templates/blogs/blog-card";
import { BLOGS } from "@/templates/blogs/demo-data";
import React from "react";

const Blogs = () => {
  return (
    <section className="container pb-32">
      <div className="flbx">
        <HeroText className="text-4xl">Blogs & Articles</HeroText>
        <button className="flx gap-2 text-orange-300">
          Explore More
          <LordIcon icon="ircnfpus" height={24} width={24} primary="#ffb86a" target="button"/>
        </button>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8">
        {BLOGS.slice(0, 3)?.map((data, index) => (
          <BlogCard key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
