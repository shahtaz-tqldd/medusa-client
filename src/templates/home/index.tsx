"use client";

import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Hero from "./hero";
import Features from "./features/features";
import ProjectList from "./projects/project-list";
import SoftSkills from "./soft-skills";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Features />
      <ProjectList />
      <Experiences />
      <SoftSkills />
      <Blogs />
    </>
  );
}
