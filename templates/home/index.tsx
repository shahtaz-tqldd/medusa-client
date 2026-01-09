"use client";

import Hero from "./hero";
import AboutMe from "./about-me";
import ProjectList from "./project-list";
import Experiences from "./experiences";
import BlogPreview from "./blog-preview";
import Achievement from "./achievements";
import Expertise from "./expertise";
import { BlogBasicProps } from "@/lib/api-service/blog";
import { PaginatedResponse } from "@/lib/api-service/_types";

interface HomepageProps {
  blogs: PaginatedResponse<BlogBasicProps[]>;
}

export default function Homepage({ blogs }: HomepageProps) {
  return (
    <>
      <Hero />
      <AboutMe />
      <Expertise />
      <ProjectList />
      <Experiences />
      <Achievement />
      <BlogPreview blogs={blogs.results.flat()} total={blogs.count || 0} />
    </>
  );
}
