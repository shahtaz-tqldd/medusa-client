"use client";
import { sendVisitorData } from "@/lib/get-visitor-data";
import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Features from "./features/features";
import Hero from "./hero/hero";
import ProjectList from "./projects/project-list";
import { useEffect } from "react";

export default function Homepage() {
  useEffect(() => {
    const visitor = sendVisitorData();
    console.log(visitor)
  }, []);
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
