import DataTable from "@/components/table/table";
import { card } from "@/lib/styles";
import React from "react";
import { VISITOR_TABLE_HEADER } from "./data";
import { visitor_demo_data } from "./demo-data";

const VisitorList = () => {
  return (
    <div className="">
      <h2 className="mb-6">Visitor List</h2>
      <DataTable columns={VISITOR_TABLE_HEADER} data={visitor_demo_data} />
    </div>
  );
};

export default VisitorList;
