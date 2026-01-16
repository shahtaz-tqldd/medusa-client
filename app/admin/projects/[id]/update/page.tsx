import DashboardLayout from "@/layouts/admin-layout";
import CreateProjectPage from "@/templates/admin/projects/create-project";
import { fetchProjectById } from "@/lib/api-service/project-action";

export default async function AdminProjectUpdate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectRes = await fetchProjectById(id);
  return (
    <DashboardLayout>
      <CreateProjectPage initialData={projectRes.data || {}} projectId={id} />
    </DashboardLayout>
  );
}
