import React from "react";
import Link from "next/link";

import PageTitle from "@/components/reusable/page-title";
import ProjectList from "./project-list";

import { Plus } from "lucide-react";

import { projects } from "@/templates/home/projects/_demo_data";
import { Project } from "@/templates/home/projects/_types";

const ProjectPage = () => {
  const data: Project[] = projects;
  return (
    <div>
      <div className="flbx">
        <PageTitle>Projects</PageTitle>
        <Link href="/dashboard/projects/create" className="flx gap-2 text-sm py-3 pr-5 pl-4 bg-white/10 rounded-full">
          <Plus size={15} />
          New Project
        </Link>
      </div>
      <ProjectList projects={data} />
    </div>
  );
};

export default ProjectPage;
