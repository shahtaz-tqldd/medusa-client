"use client";

import React, { useState } from "react";
import HeroText from "@/components/text/hero-text";
import ProjectCard from "./project-card";
import { projects } from "./data";
import ProjectModal from "./project-modal";
import type { MetaProps } from "./types";

const tabs = ["All Projects", "Web App", "Software", "Backend Project"];

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("All Projects");
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
    <section className="container pb-32">
      <div className="flbx">
        <HeroText className="text-4xl">Project List</HeroText>
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-all-600
                ${activeTab === tab ? "elo-nui" : ""}
              `}
            >
              {tab}
            </button>
          ))}
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
