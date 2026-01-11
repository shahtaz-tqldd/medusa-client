import DashboardLayout from "@/layouts/admin-layout";
import AdminAchievementPage from "@/templates/admin/achievements";
import { fetchAchievements } from "@/lib/api-service/achievement";

export default async function AdminAchievements() {
  const achievementRes = await fetchAchievements();
  return (
    <DashboardLayout>
      <AdminAchievementPage achievements={achievementRes?.data.flat() || []} />
    </DashboardLayout>
  );
}
