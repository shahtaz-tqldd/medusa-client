"use client";

import React, { useState } from "react";

// components
import ShinyText from "@/components/animation/shiny-text";
import ProjectCard from "@/templates/projects/project-card";
import ProjectDetailsDrawer from "@/templates/projects/project-details-drawer";
import { Title } from "@/components/ui/typography";
import { Tab, Tabs } from "@/components/ui/tabs";

// data
import { projectTabs } from "@/templates/projects/_data";
import { ProjectBasicProps } from "@/lib/api-service/projects";

const ProjectList = ({ projects }: { projects: ProjectBasicProps[] }) => {
  const [active, setActive] = useState<Tab>(projectTabs[0]);
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects =
    active.value === "all-projects"
      ? projects
      : projects.filter((project) => project.type === active.value);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleSetProject = (id: string) => {
    setSelectedProjectId(id);
    setIsOpen(true);
  };

  return (
    <section id="projects" className="container py-8 md:py-20">
      <div className="flex justify-between md:items-end items-start flex-col md:flex-row gap-5">
        <div>
          <ShinyText>Portfolio</ShinyText>
          <Title variant="lg">Personal Projects</Title>
        </div>
        <div className="relative">
          <Tabs tabs={projectTabs} active={active} setActive={setActive} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8 md:mt-12">
        {filteredProjects?.map((data, index) => (
          <ProjectCard
            key={index}
            data={data}
            handleSetProject={handleSetProject}
          />
        ))}
      </div>

      <ProjectDetailsDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        projectId={selectedProjectId}
      />
    </section>
  );
};

export default ProjectList;
