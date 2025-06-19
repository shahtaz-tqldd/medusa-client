"use client";
import React, { useState } from "react";
import MetricsCards from "./overiview/overview";
import VisitorList from "./overiview/visitor-list";
import VisitorGraph from "./overiview/visitor-graph";
import PageTitle from "@/components/reusable/page-title";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <PageTitle>Overview</PageTitle>
      <div className="space-y-8 mt-8">
        <MetricsCards />
        <button className="" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>
        {show && (
          <>
            <VisitorGraph />
            <VisitorList />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
