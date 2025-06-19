"use client";

import React, { useState } from "react";

// components
import HeroText from "@/components/text/hero-text";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import { Tabs } from "@/components/ui/tabs";

// types
import type { MetaProps } from "./types";
import type { Tab } from "@/assets/types/tabs";

// data
import { projects, projectTabs } from "./data";

const ProjectList = () => {
  const [active, setActive] = useState<Tab>(projectTabs[0]);
  const [meta, setMeta] = useState<MetaProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    <section className="container py-24">
      <div className="flbx">
        <HeroText>Project List</HeroText>
        <div className="relative">
          <Tabs tabs={projectTabs} active={active} setActive={setActive} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-12 mt-12">
        {projects?.map((data, index) => (
          <ProjectCard
            key={index}
            data={data}
            handleSetProject={handleSetProject}
          />
        ))}
      </div>

      {/* Render modal only when data exists */}
      {meta && (
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
