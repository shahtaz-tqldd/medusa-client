"use client";
import React, { useEffect, useState } from "react";

// hooks
import { fetchOverviewStats, Visitor } from "@/lib/overview-service";

import OverviewMetrics from "./metrics";
import VisitorList from "./visitor-list";

import { Text, Title } from "@/components/ui/typography";
import VisitorGraph from "./visitor-graph";
import VisitorMap from "./visitor-map";
import ProjectOverview from "./project-overview";
import { projects } from "@/templates/projects/_data";
import BlogPerformance from "./blog-performance";

const visitor_cycles = [
  {
    month: "January",
    visitor_count: 20,
  },
  {
    month: "Feburary",
    visitor_count: 21,
  },
  {
    month: "March",
    visitor_count: 32,
  },
  {
    month: "Aprli",
    visitor_count: 40,
  },
  {
    month: "May",
    visitor_count: 32,
  },
  {
    month: "June",
    visitor_count: 42,
  },
];

const demoVisitors: Visitor[] = [
  {
    id: 1,
    city: "New York",
    country: "United States",
    device_name: "Chrome",
    device_type: "desktop",
    visit_count: 5,
    last_visit: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 2,
    city: "London",
    country: "United Kingdom",
    device_name: "Safari",
    device_type: "mobile",
    visit_count: 12,
    last_visit: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 3,
    city: "Tokyo",
    country: "Japan",
    device_name: "Chrome",
    device_type: "tablet",
    visit_count: 3,
    last_visit: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 4,
    city: "Sydney",
    country: "Australia",
    device_name: "Firefox",
    device_type: "desktop",
    visit_count: 8,
    last_visit: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 5,
    city: "Toronto",
    country: "Canada",
    device_name: "Edge",
    device_type: "mobile",
    visit_count: 15,
    last_visit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 6,
    city: "Paris",
    country: "France",
    device_name: "Safari",
    device_type: "desktop",
    visit_count: 7,
    last_visit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
];

const OverviewPage = () => {
  const [stats, setStats] = useState({
    visitors: {
      total: 0,
      this_month: 0,
      cycles: visitor_cycles,
      desktop: 0,
      mobile: 0,
    },

    conversations: {
      total: 0,
      unread: 0,
      meetings_scheduled: 0,
      upcoming_meetings: 0,
    },

    blogs: {
      total: 0,
      total_reads: 0,
    },

    proposals: {
      total: 0,
      onboarded_clients: 0,
    },
  });
  const [visitors, setVisitors] = useState(demoVisitors);

  const limit = 6;

  useEffect(() => {
    fetchOverviewStats();
  }, []);

  return (
    <div>
      <Text>Hello Mr. Shahtaz Rahman</Text>
      <Title>Welcome to your Portfolio Admin</Title>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
        <div className="md:col-span-2 col-span-1 space-y-6">
          <OverviewMetrics stats={stats} />
          <VisitorGraph visitors={stats?.visitors?.cycles} />
          <VisitorMap />
        </div>

        <div className="col-span-1 space-y-8">
          <VisitorList visitors={visitors} />
          <BlogPerformance />
          <ProjectOverview projects={projects.slice(0,4)} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
