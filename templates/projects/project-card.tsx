"use client";

import React from "react";
import Image from "next/image";

import { Title } from "@/components/ui/typography";

import { ArrowRight, Link } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { colors } from "@/lib/colors";
import { ProjectBasicProps } from "@/lib/api-service/projects";

interface ProjectCardProps {
  handleSetProject: (id: string) => void;
  data: ProjectBasicProps;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  handleSetProject,
}) => {
  const { id, title, featured_image_url, type, live_link } = data;

  const handleSeeLiveLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="group cursor-pointer" onClick={() => handleSetProject(id)}>
      <AnimateDiv className="relative">
        <Image
          src={featured_image_url}
          className="h-60 md:h-72 w-full object-cover rounded-3xl"
          alt={title}
          height={400}
          width={620}
        />
        <div className="mt-3 space-y-2">
          <TechBadge color={type === "web_app" ? colors[0] : colors[1]}>
            {type?.split("_").join(" ")}
          </TechBadge>
          <Title variant="sm">{title}</Title>
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
