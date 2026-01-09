import DashboardLayout from "@/layouts/admin-layout";
import SkillsExpertisePage from "@/templates/admin/skills-expertise";

export default async function AdminSkillsAndExpertise() {
  return (
    <DashboardLayout>
      <SkillsExpertisePage />
    </DashboardLayout>
  );
}
