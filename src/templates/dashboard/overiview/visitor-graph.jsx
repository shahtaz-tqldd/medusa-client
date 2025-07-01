import React from "react";
import PrimaryCard from "@/components/cards/primary-card";
import MedusaBarChart from "@/components/charts/bar-chart";

const VisitorGraph = ({ visitors }) => {
  const chartData = visitors?.map((item) => ({
    date: item?.end_date,
    visitor: item?.visitor_count,
  }));

  return (
    <PrimaryCard>
      <div className="flex flex-col justify-between h-full gap-8">
        <h2>Portfolio Visitor</h2>
        <MedusaBarChart chartData={chartData} />
      </div>
    </PrimaryCard>
  );
};

export default VisitorGraph;
