"use client";
import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Features from "./features/features";
import Hero from "./hero/hero";
import ProjectList from "./projects/project-list";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Features />
      <ProjectList />
      <Experiences />
      <Blogs />
    </>
  );
}
