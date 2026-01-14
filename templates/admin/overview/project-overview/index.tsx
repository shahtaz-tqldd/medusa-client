import React from "react";
import Image from "next/image";
import { Text, Title } from "@/components/ui/typography";
import { ProjectBasicProps } from "@/lib/api-service/projects";
import { Layers } from "lucide-react";
import Link from "next/link";

interface ProjectOverviewProps {
  projects: ProjectBasicProps[];
}

const ProjectOverview = ({ projects }: ProjectOverviewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flbx">
        <div className="flx gap-2">
          <div className="h-10 w-10 center dark:bg-white/10 bg-emerald-500/10 rounded-lg">
            <Layers size={16} className="text-emerald-600 dark:text-lime-400" />
          </div>

          <Title variant="xs">Project Overview</Title>
        </div>
        <Link
          href="/admin/projects"
          className="text-sm text-emerald-600 dark:text-lime-400"
        >
          All Projects
        </Link>
      </div>

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
