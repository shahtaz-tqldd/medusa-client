import DashboardLayout from "@/layouts/admin-layout";
import { fetchProjects } from "@/lib/api-service/projects";
import ProjectPage from "@/templates/admin/projects";

export default async function AdminProjectPage() {
  const projectListResponse = await fetchProjects(1, 10);
  return (
    <DashboardLayout>
      <ProjectPage
        projects={projectListResponse.data.results || []}
        total_count={projectListResponse.data.count || 0}
      />
    </DashboardLayout>
  );
}
