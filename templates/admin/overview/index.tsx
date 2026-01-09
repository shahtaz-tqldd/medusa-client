import React from "react";

// hooks
import OverviewMetrics from "./metrics";
import VisitorList from "./visitor-list";

import { Text, Title } from "@/components/ui/typography";
import VisitorGraph from "./visitor-graph";
import VisitorMap from "./visitor-map";
import ProjectOverview from "./project-overview";
import { projects } from "@/templates/projects/_data";
import BlogPerformance from "./blog-performance";

import { OverviewStats } from "@/lib/api-service/overview";
import { PaginatedResponse } from "@/lib/api-service/_types";
import { BlogBasicProps } from "@/lib/api-service/blog";
import { Visitor } from "@/lib/api-service/visitor";

interface OverviewPageProps {
  data: OverviewStats;
  latestVisitors: PaginatedResponse<Visitor[]>;
  blogs: PaginatedResponse<BlogBasicProps[]>;
}

const OverviewPage = ({ data, latestVisitors, blogs }: OverviewPageProps) => {
  return (
    <div>
      <Text>Hello Mr. Shahtaz</Text>
      <Title>Welcome to your Portfolio Admin</Title>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
        <div className="md:col-span-2 col-span-1 space-y-6">
          <OverviewMetrics stats={data} />
          <VisitorGraph visitors={data?.visitors?.month_wise} />
          <VisitorMap visitors={data.visitors.country_wise} />
        </div>

        <div className="col-span-1 space-y-8">
          <VisitorList visitors={latestVisitors?.results} />
          <BlogPerformance blogs={blogs.results} />
          <ProjectOverview projects={projects.slice(0, 4)} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
