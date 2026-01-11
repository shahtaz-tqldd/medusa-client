import DashboardLayout from "@/layouts/admin-layout";
import AdminExperiencePage from "@/templates/admin/experiences";
import { fetchExperiences } from "@/lib/api-service/experiences";

export default async function AdminExperiences() {
  const experienceResponse = await fetchExperiences();
  return (
    <DashboardLayout>
      <AdminExperiencePage experiences={experienceResponse?.data || []} />
    </DashboardLayout>
  );
}
