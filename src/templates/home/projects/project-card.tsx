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
      <Image src={img} className="h-72 w-full object-cover rounded-3xl" alt={name} />
      <h2 className={`text-sm mt-4 pl-1 uppercase ${projectType==="Web App" ? "text-orange-400": "text-emerald-400"}`}>{projectType}</h2>
      <div className="flx gap-4 px-1 cursor-pointer" onClick={() => handleSetProject(id)}>
        <div className="flex-1">
          <h2 className="text-xl mt-2 dark:text-gray-300 text-slate-800 tr">{name}</h2>
        </div>
        {/* <span className="h-12 w-12 border border-white/10 hover:bg-white/5 tr rounded-2xl center mt-4">
          <LordIcon icon="ircnfpus" height={28} width={28} primary="#2b7fff" rotate="-45deg" />
        </span> */}
      </div>
    </section>
  );
};

export default ProjectCard;
