import DashboardLayout from "@/layouts/admin-layout";
import OverviewPage from "@/templates/admin/overview";
import { fetchOverviewStats } from "@/lib/api-service/overview";
import { fetchVisitors } from "@/lib/api-service/visitor";
import { fetchBlogs } from "@/lib/api-service/blog";
import { fetchProjects } from "@/lib/api-service/projects";

export default async function AdminOverview() {
  const overviewData = await fetchOverviewStats();
  const visitorsResponse = await fetchVisitors(1, 6);
  const blogResponse = await fetchBlogs(1, 3, "", "view_count");
  const projectListResponse = await fetchProjects(1, 4, "view_count");

  return (
    <DashboardLayout>
      <OverviewPage
        data={overviewData?.data}
        latestVisitors={visitorsResponse?.data.results || []}
        blogs={blogResponse?.data.results || []}
        projects={projectListResponse?.data.results || []}
      />
    </DashboardLayout>
  );
}
