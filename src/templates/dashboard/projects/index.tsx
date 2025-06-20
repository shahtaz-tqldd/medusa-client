import React from "react";
import PageTitle from "@/components/reusable/page-title";
import ProjectList from "./project-list";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProjectPage = () => {
  return (
    <div>
      <div className="flbx">
        <PageTitle>Projects</PageTitle>
        <Link href="/dashboard/projects/create" className="flx gap-2 text-sm py-3 pr-5 pl-4 bg-white/10 rounded-full">
          <Plus size={15} />
          New Project
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default ProjectPage;
