"use client";

import Hero from "./hero";
import AboutMe from "./about-me";
import ProjectList from "./project-list";
import Experiences from "./experiences";
import BlogPreview from "./blog-preview";
import Achievement from "./achievements";
import Expertise from "./expertise";
import { BlogBasicProps } from "@/lib/api-service/blog";
import { SkillsProps } from "@/lib/api-service/skills";
import { ExperienceProps } from "@/lib/api-service/experiences";
import { ExpertiseProps } from "@/lib/api-service/expertise";
import { ProjectBasicProps } from "@/lib/api-service/projects";
import { AchievementProps } from "@/lib/api-service/achievement";

interface HomepageProps {
  data: SkillsProps;
  expertises: ExpertiseProps[];
  projects: ProjectBasicProps[];
  experiences: ExperienceProps[];
  achievements: AchievementProps[];
  blogs: BlogBasicProps[];
  total_blog: number;
}

export default function Homepage({
  data,
  expertises,
  projects,
  experiences,
  achievements,
  blogs,
  total_blog,
}: HomepageProps) {
  return (
    <>
      <Hero
        title={data.title}
        focus_areas={data.key_focus_areas}
        my_story={data.my_story}
      />
      <AboutMe data={data} />
      <Expertise expertises={expertises} />
      <ProjectList projects={projects} />
      <Experiences experiences={experiences} />
      <Achievement achievements={achievements} />
      <BlogPreview blogs={blogs} total_blog={total_blog} />
    </>
  );
}
