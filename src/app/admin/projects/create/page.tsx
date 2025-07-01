import DashboardLayout from "@/layouts/dashboard";
import CreateProjectPage from "@/templates/dashboard/projects/create-project";

export default function Projects() {
  return (
    <DashboardLayout>
      <CreateProjectPage />
    </DashboardLayout>
  );
}
