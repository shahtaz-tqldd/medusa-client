import React from "react";
import Image from "next/image";
import { Text, Title } from "@/components/ui/typography";
import { Project } from "@/templates/projects/_types";

interface ProjectOverviewProps {
  projects: Project[];
}

const ProjectOverview = ({ projects }: ProjectOverviewProps) => {
  return (
    <div className="flex flex-col">
      <Title variant="xs" className="mb-6">
        Project Overview
      </Title>

      {/* This container will be scrollable if there are many projects */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex space-x-4 p-3 dark:bg-white/5 bg-white rounded-2xl hover:bg-muted/50 transition-colors"
          >
            {/* Project Thumbnail */}
            <Image
              src={project.images.main}
              alt={`${project.name} thumbnail`}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              height={120}
              width={120}
            />

            {/* Project Details */}
            <div className="flex-1 justify-between">
              <div>
                <Title variant="xs" className="!text-lg">
                  {project.name}
                </Title>
              </div>

              {/* Footer: Status Badge and Action Links */}
              <div className="flbx">
                <div className="flex flex-wrap gap-3.5 mt-2">
                  {/* Show only the first 3 tech stacks to save space */}
                  {project.tech_stacks.slice(0, 3).map((tech) => (
                    <Text key={tech} className="!text-xs">
                      {tech}
                    </Text>
                  ))}
                  {project.tech_stacks.length > 3 && (
                    <Text className="!text-xs">
                      +{project.tech_stacks.length - 3}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
