import React from "react";
import PrimaryCard from "@/components/cards/primary-card";
import MedusaBarChart from "@/components/charts/bar-chart";

const VisitorGraph = () => {
  return (
    <PrimaryCard>
      <div className="flex flex-col justify-between h-full gap-8">
        <h2>Portfolio Visitor</h2>
        <MedusaBarChart />
      </div>
    </PrimaryCard>
  );
};

export default VisitorGraph;
