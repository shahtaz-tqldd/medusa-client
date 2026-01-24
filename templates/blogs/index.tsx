"use client";

import BlogCard from "./blog-card";
import { Title } from "@/components/ui/typography";
import { BlogBasicProps } from "@/lib/api-service/blog";

interface BlogPageProps {
  blogs: BlogBasicProps[];
}

const BlogPage = ({ blogs }: BlogPageProps) => {
  return (
    <section className="container py-20">
      <div className="flbx md:flex-row flex-col gap-5 md:mt-6">
        <Title variant="lg">Blogs and Articles</Title>
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
