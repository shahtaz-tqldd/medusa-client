import React from "react";
import PageTitle from "@/components/reusable/page-title";
import ProjectList from "./project-list";
import { Plus } from "lucide-react";

const ProjectPage = () => {
  return (
    <div>
      <div className="flbx">
        <PageTitle>Projects</PageTitle>
        <button className="flx gap-2 text-sm py-3 pr-5 pl-4 bg-white/10 rounded-full">
          <Plus size={15} />
          New Project
        </button>
      </div>
      <ProjectList />
    </div>
  );
};

export default ProjectPage;
