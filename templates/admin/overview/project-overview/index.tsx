import React from "react";
import Image from "next/image";
import { Text, Title } from "@/components/ui/typography";
import { ProjectBasicProps } from "@/lib/api-service/projects";

interface ProjectOverviewProps {
  projects: ProjectBasicProps[];
}

const ProjectOverview = ({ projects }: ProjectOverviewProps) => {
  return (
    <div className="flex flex-col">
      <Title variant="xs" className="mb-6">
        Project Overview
      </Title>

      {/* This container will be scrollable if there are many projects */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex space-x-4 p-3 dark:bg-white/5 bg-white rounded-2xl hover:bg-muted/50 transition-colors"
          >
            {/* Project Thumbnail */}
            <Image
              src={project.featured_image_url}
              alt={`${project.title} thumbnail`}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              height={120}
              width={120}
            />

            {/* Project Details */}
            <div className="flex-1 justify-between">
              <div>
                <Title variant="xs" className="!text-lg">
                  {project.title}
                </Title>
              </div>

              {/* Footer: Status Badge and Action Links */}
              <div className="flx">
                <Text className="!text-xs">
                  {project.view_count || 0} Views
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
