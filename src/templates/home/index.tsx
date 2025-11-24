"use client";

import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Hero from "./hero";
import AboutMe from "./about-me";
import ProjectList from "./projects/project-list";
import SoftSkills from "./soft-skills";

export default function Homepage() {
  return (
    <>
      <Hero />
      <AboutMe />
      <ProjectList />
      <Experiences />
      <SoftSkills />
      <Blogs />
    </>
  );
}
