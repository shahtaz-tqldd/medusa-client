import MainLayout from "@/layouts/main-layout";
import Homapage from "@/templates/home";

// API Calling
import { fetchAchievements } from "@/lib/api-service/achievement";
import { fetchBlogs } from "@/lib/api-service/blog";
import { fetchExperiences } from "@/lib/api-service/experiences";
import { fetchExpertise } from "@/lib/api-service/expertise";
import { fetchProjects } from "@/lib/api-service/projects";
import { fetchSkills } from "@/lib/api-service/skills";

// Default Data
import { DEFAULT_SKILLS_DATA } from "@/assets/data/fallback_data";

export default async function Home() {
  const results = await Promise.allSettled([
    fetchSkills(),
    fetchExpertise(),
    fetchProjects(1, 10),
    fetchExperiences(),
    fetchAchievements(),
    fetchBlogs(1, 4),
  ]);

  const [
    skillsResult,
    expertiseResult,
    projectsResult,
    experiencesResult,
    achievementsResult,
    blogsResult,
  ] = results;

  return (
    <MainLayout>
      <Homapage
        data={
          skillsResult.status === "fulfilled"
            ? skillsResult.value?.data || DEFAULT_SKILLS_DATA
            : DEFAULT_SKILLS_DATA
        }
        expertises={
          expertiseResult.status === "fulfilled"
            ? expertiseResult.value?.data || []
            : []
        }
        projects={
          projectsResult.status === "fulfilled"
            ? projectsResult.value?.data?.results || []
            : []
        }
        experiences={
          experiencesResult.status === "fulfilled"
            ? experiencesResult.value?.data || []
            : []
        }
        achievements={
          achievementsResult.status === "fulfilled"
            ? achievementsResult.value?.data || []
            : []
        }
        blogs={
          blogsResult.status === "fulfilled"
            ? blogsResult.value?.data.results || []
            : []
        }
        total_blog={
          blogsResult.status == "fulfilled"
            ? blogsResult.value.data.count || 0
            : 0
        }
      />
    </MainLayout>
  );
}
