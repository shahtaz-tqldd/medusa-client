import DashboardLayout from "@/layouts/admin-layout";
import { fetchProjects } from "@/lib/api-service/projects";
import CreateExpertisePage from "@/templates/admin/expertise/create-expertise";

export default async function AdminExpertiseCreate() {
  const projectListResponse = await fetchProjects(1, 10);
  return (
    <DashboardLayout>
      <CreateExpertisePage projects={projectListResponse.data.results || []} />
    </DashboardLayout>
  );
}
