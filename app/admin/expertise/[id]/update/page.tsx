import DashboardLayout from "@/layouts/admin-layout";
import CreateExpertisePage from "@/templates/admin/expertise/create-expertise";
import { fetchProjects } from "@/lib/api-service/projects";
import { fetchExpertiseById } from "@/lib/api-service/expertise";

export default async function AdminExpertiseUpdate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [expertise, projects] = await Promise.all([
    fetchExpertiseById(id),
    fetchProjects(),
  ]);

  return (
    <DashboardLayout>
      <CreateExpertisePage
        expertiseId={id}
        projects={projects.data.results || []}
        initialData={expertise.data}
      />
    </DashboardLayout>
  );
}
