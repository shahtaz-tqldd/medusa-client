import React from "react";
import Image from "next/image";

import { HeaderText } from "@/components/text/title-text";

import type { Project } from "./types";
import { Dot } from "lucide-react";

interface ProjectCardProps {
  handleSetProject: (id: string) => void;
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  handleSetProject,
}) => {
  const { id, name, img, projectType } = data;

  return (
    <section>
      <Image
        src={img}
        className="h-72 w-full object-cover rounded-3xl"
        alt={name}
      />
      <h2
        className={`text-sm mt-4 pl-1 uppercase ${
          projectType === "Web App" ? "text-orange-400" : "text-emerald-400"
        }`}
      >
        {projectType}
      </h2>
      <div
        className="px-1 cursor-pointer"
        onClick={() => handleSetProject(id)}
      >
        <HeaderText className="mt-2.5">{name}</HeaderText>
        <div className="mt-6 text-sm opacity-60 flx">Frontend <Dot/> React JS <Dot/> Node JS</div>
      </div>
    </section>
  );
};

export default ProjectCard;
