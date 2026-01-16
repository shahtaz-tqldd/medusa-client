import DashboardLayout from "@/layouts/admin-layout";
import CreateExperiencePage from "@/templates/admin/experiences/create-experience";
import { fetchExperienceById } from "@/lib/api-service/experiences";

export default async function AdminExperienceUpdate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experienceRes = await fetchExperienceById(id);
  return (
    <DashboardLayout>
      <CreateExperiencePage
        initialData={experienceRes.data || {}}
        experienceId={id}
      />
    </DashboardLayout>
  );
}
