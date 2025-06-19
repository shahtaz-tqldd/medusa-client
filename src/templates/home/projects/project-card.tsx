"use client";

import React from "react";
import LordIcon from "@/assets/icons/lord-icon";
import Image from "next/image";
import type { Project } from "./types";

interface ProjectCardProps {
  handleSetProject: (id: string) => void;
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, handleSetProject }) => {
  const { id, name, img, projectType } = data;

  return (
    <section>
      <Image src={img} className="h-72 w-full object-cover rounded-2xl" alt={name} />
      <h2 className="text-sm mt-4 text-orange-300">{projectType}</h2>
      <div className="flx gap-4 cursor-pointer" onClick={() => handleSetProject(id)}>
        <div className="flex-1">
          <h2 className="text-xl mt-2 opacity-90 hover:opacity-100 tr">{name}</h2>
        </div>
        <span className="h-12 w-12 border border-white/10 hover:bg-white/5 tr rounded-full center mt-4 -rotate-45">
          <LordIcon icon="ircnfpus" height={28} width={28} primary="#ffb86a" />
        </span>
      </div>
    </section>
  );
};

export default ProjectCard;
