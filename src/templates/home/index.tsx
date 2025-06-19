"use client";
import { getVisitorData } from "@/lib/get-visitor-data";
import Blogs from "./blogs/blogs";
import Experiences from "./experiences/experiences";
import Features from "./features/features";
import Hero from "./hero/hero";
import ProjectList from "./projects/project-list";
import { useEffect } from "react";

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
