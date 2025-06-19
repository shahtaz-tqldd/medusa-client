import MedusaBarChart from "@/components/charts/bar-chart";
import { card } from "@/lib/styles";
import React from "react";

const VisitorGraph = () => {
  return (
    <div className={` flex flex-col justify-between`}>
      <h2>Portfolio Visitor</h2>
      <MedusaBarChart />
    </div>
  );
};

export default VisitorGraph;
