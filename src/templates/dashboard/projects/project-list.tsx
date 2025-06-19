import React from "react";
import DataTable from "@/components/table/table";
import { PROJECT_TABLE_HEADER } from "./data";
import { project_demo_data } from "./demo-data";
import { Ellipsis } from "lucide-react";

const ProjectList = () => {
  const project_data = project_demo_data?.map((item) => ({
    id: item.id,
    project: <div>{item?.name}</div>,
    type: item?.type,
    status: <span className="bg-green-400/10 py-1.5 px-3 rounded-full capitalize text-green-500 border border-green-500/20 text-xs">{item?.status}</span>,
    createdAt: item?.created_at,
    action: (
      <div className="flex justify-end">
        <button className="h-7 w-7 rounded-full center hover:bg-white/5 tr group">
          <Ellipsis size={16} className="group-hover:dark:text-white tr" />
        </button>
      </div>
    ),
  }));
  return (
    <div className="mt-6">
      <DataTable columns={PROJECT_TABLE_HEADER} data={project_data} />
    </div>
  );
};

export default ProjectList;
