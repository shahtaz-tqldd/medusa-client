import DashboardLayout from "@/layouts/admin-layout";
import CreateExperiencePage from "@/templates/admin/experiences/create-experience";

export default async function AdminExperienceCreate() {
  return (
    <DashboardLayout>
      <CreateExperiencePage />
    </DashboardLayout>
  );
}
