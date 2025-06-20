import React from "react";
import Link from "next/link";

import PageTitle from "@/components/reusable/page-title";
import ProjectList from "./project-list";

import { Plus } from "lucide-react";

import { project_demo_data } from "./_demo-data";
import type { Project } from "./_types";

const ProjectPage = () => {
  const data: Project[] = project_demo_data;
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
