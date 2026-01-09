import DashboardLayout from "@/layouts/admin-layout";
import CreateProjectPage from "@/templates/admin/projects/create-project";

export default async function AdminCreateProject() {
  return (
    <DashboardLayout>
      <CreateProjectPage />
    </DashboardLayout>
  );
}
