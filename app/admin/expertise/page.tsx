import DashboardLayout from "@/layouts/admin-layout";
import { fetchExpertise } from "@/lib/api-service/expertise";
import AdminExpertisePage from "@/templates/admin/expertise";

export default async function AdminExpertise() {
  const expertiseResponse = await fetchExpertise();
  return (
    <DashboardLayout>
      <AdminExpertisePage expertises={expertiseResponse?.data || []} />
    </DashboardLayout>
  );
}
