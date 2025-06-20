"use client";
import { useEffect } from "react";
import { getVisitorData } from "@/lib/get-visitor-data";

import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Hero from "./hero/hero";
import Features from "./features/features";
import ProjectList from "./projects/project-list";

export default function Homepage() {
  useEffect(() => {
    const fetchVisitorData = async () => {
      const visitor = await getVisitorData();
      console.log(visitor);
    };

    fetchVisitorData();
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
