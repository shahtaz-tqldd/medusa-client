"use client";

import Hero from "./hero";
import AboutMe from "./about-me";
import ProjectList from "./project-list";
import Experiences from "./experiences";
import BlogPreview from "./blog-preview";
import Achievement from "./achievements";
import Expertise from "./expertise";

export default function Homepage() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Expertise />
      <ProjectList />
      <Experiences />
      <Achievement />
      <BlogPreview />
    </>
  );
}
