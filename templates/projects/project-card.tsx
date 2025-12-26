"use client";

import React from "react";
import Image from "next/image";

import { ArrowRight, Link } from "lucide-react";

import type { Project } from "./_types";
import { Title } from "@/components/ui/typography";
import AnimateIn from "@/components/animation/animate-in";

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

  return (
    <section
      className="group cursor-pointer"
      onClick={() => handleSetProject(id)}
    >
      <AnimateIn index={0} className="h-72 w-full overflow-hidden rounded-3xl">
        <Image
          src={images?.main}
          className="h-full w-full object-cover rounded-3xl"
          alt={name}
          height={400}
          width={600}
        />
      </AnimateIn>

      <AnimateIn index={0.1}>
        <h2
          className={`text-xs mt-4 px-3 py-1.5 w-fit rounded-full ${
            type === "Web App"
              ? "text-orange-400 bg-orange-400/10"
              : "text-emerald-400 bg-emerald-400/10"
          }`}
        >
          {type}
        </h2>
        <Title variant="sm">{name}</Title>
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
      </AnimateIn>
    </section>
  );
};

export default ProjectCard;
