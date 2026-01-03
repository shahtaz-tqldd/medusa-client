"use client";

import React from "react";
import Image from "next/image";

import { Title } from "@/components/ui/typography";

import type { Project } from "./_types";
import { ArrowRight, Link } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const colors = [
    "dark:!text-emerald-500 !text-emerald-600 dark:bg-emerald-100/5 bg-emerald-500/5 scale-75",
    "dark:!text-orange-500 !text-orange-600 dark:bg-orange-100/5 bg-orange-500/5 scale-75",
  ];
  return (
    <div className="group cursor-pointer" onClick={() => handleSetProject(id)}>
      <AnimateDiv className="relative">
        <Image
          src={images?.main}
          className="h-60 md:h-72 w-full object-cover rounded-3xl"
          alt={name}
          height={400}
          width={620}
        />
        <div className="mt-3 space-y-2">
          <div className="w-fit -translate-x-2.5">
            <TechBadge color={type === "Web App" ? colors[0] : colors[1]}>
              {type}
            </TechBadge>
          </div>
          <Title variant="sm">{name}</Title>
        </div>
        <div className="mt-6 text-sm flx gap-2">
          <Button variant="secondary">
            <ArrowRight className="h-4 w-4 -rotate-45" />
            View Details
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSeeLiveLink(live_link || "");
            }}
            variant="ghost"
          >
            <Link size={14} />
            Live Link
          </Button>
        </div>
      </AnimateDiv>
    </div>
  );
};

export default ProjectCard;
