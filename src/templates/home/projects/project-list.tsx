"use client";

import React, { useState } from "react";

// components
import HeroText from "@/components/text/hero-text";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import { Tabs } from "@/components/ui/tabs";

// types
import type { MetaProps, Tab } from "./_types";

// data
import { projects, projectTabs } from "./_demo_data";

const ProjectList = () => {
  const [active, setActive] = useState<Tab>(projectTabs[0]);
  const [meta, setMeta] = useState<MetaProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects =
    active.value === "all-projects"
      ? projects
      : projects.filter((project) => project.type === active.value);

  const handleSetProject = (id: string) => {
    if (id) {
      setMeta({
        currentId: id,
        nextId: JSON.stringify(
          parseInt(id) === projects?.length ? 1 : parseInt(id) + 1
        ),
        prevId: JSON.stringify(
          parseInt(id) === 1 ? projects?.length : parseInt(id) - 1
        ),
      });
      setIsOpen(true);
    }
  };

  return (
    <section id="projects" className="container py-12 md:py-20">
      <div className="flbx flex-col md:flex-row gap-5">
        <HeroText>Project List</HeroText>
        <div className="relative">
          <Tabs tabs={projectTabs} active={active} setActive={setActive} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8 md:mt-12">
        {filteredProjects?.map((data, index) => (
          <ProjectCard
            key={index}
            index={index}
            data={data}
            handleSetProject={handleSetProject}
          />
        ))}
      </div>

      {/* Render modal only when data exists */}
      {meta && isOpen && (
        <ProjectModal
          meta={meta}
          setMeta={setMeta}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </section>
  );
};

export default ProjectList;
