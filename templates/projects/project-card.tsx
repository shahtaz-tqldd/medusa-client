"use client";

import React from "react";
import Image from "next/image";

import { Title } from "@/components/ui/typography";

import type { Project } from "./_types";
import { ArrowRight, Link } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";

interface ProjectCardProps {
  handleSetProject: (id: string) => void;
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  handleSetProject,
}) => {
  const { id, name, images, type, live_link } = data;

  const handleSeeLiveLink = (url: string) => {
    window.open(url, "_blank");
  };
  const hover_button =
    "flx gap-2.5 hover:dark:bg-white/10 hover:bg-blue-500/10 py-2 pr-4 pl-3 rounded-full tr";

  const colors = [
    "!bg-emerald-600 !text-white !text-xs",
    "!bg-rose-900 !text-white !text-xs",
  ];
  return (
    <div className="group cursor-pointer" onClick={() => handleSetProject(id)}>
      <AnimateDiv className="relative">
        <Image
          src={images?.main}
          className="h-72 w-full object-cover rounded-3xl"
          alt={name}
          height={400}
          width={620}
        />
        <div className="absolute top-4 left-4">
          <TechBadge color={type === "Web App" ? colors[0] : colors[1]}>
            {type}
          </TechBadge>
        </div>

        <Title variant="sm" className="mt-4">
          {name}
        </Title>
        <div className="mt-6 text-sm flx gap-2">
          <button className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400 tr font-semibold flx gap-2 pl-3 pr-3.5 py-2 rounded-full tr">
            <ArrowRight className="h-4 w-4 -rotate-45" />
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSeeLiveLink(live_link || "");
            }}
            className={hover_button}
          >
            <Link className="h-4 w-4" />
            Live Link
          </button>
        </div>
      </AnimateDiv>
    </div>
  );
};

export default ProjectCard;
