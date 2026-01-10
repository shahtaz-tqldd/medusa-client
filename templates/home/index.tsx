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
import { SkillsProps } from "@/lib/api-service/skills";

interface HomepageProps {
  data: SkillsProps;
  blogs: PaginatedResponse<BlogBasicProps[]>;
}

export default function Homepage({ data, blogs }: HomepageProps) {
  return (
    <>
      <Hero
        title={data.title}
        focus_areas={data.key_focus_areas}
        my_story={data.my_story}
      />
      <AboutMe data={data} />
      <Expertise />
      <ProjectList />
      <Experiences />
      <Achievement />
      <BlogPreview blogs={blogs.results.flat()} total={blogs.count || 0} />
    </>
  );
}
