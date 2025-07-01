"use client";
import React, { useEffect, useState } from "react";
import MetricsCards from "./overiview/overview";
import VisitorList from "./overiview/visitor-list";
import VisitorGraph from "./overiview/visitor-graph";
import PageTitle from "@/components/reusable/page-title";

// hooks
import { fetchOverviewStats, fetchVisitorList } from "@/lib/overview-service";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchOverviewStats().then(setStats);
  }, []);

  useEffect(() => {
    fetchVisitorList(page).then((res) => {
      if (res) setVisitors(res.results);
    });
  }, [page]);

  return (
    <div>
      <PageTitle>Overview</PageTitle>
      <div className="space-y-8 mt-8">
        <MetricsCards stats={stats} />

        <div className="grid grid-cols-2 gap-5">
          <VisitorList visitors={visitors} />
          <VisitorGraph visitors={stats?.visitors?.cycles || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
