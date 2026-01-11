import MainLayout from "@/layouts/main-layout";
import { fetchAchievements } from "@/lib/api-service/achievement";
import { fetchBlogs } from "@/lib/api-service/blog";
import { fetchExperiences } from "@/lib/api-service/experiences";
import { fetchExpertise } from "@/lib/api-service/expertise";
import { fetchProjects } from "@/lib/api-service/projects";
import { fetchSkills } from "@/lib/api-service/skills";
import Homapage from "@/templates/home";
const DEFAULT_SKILLS_DATA = {
  title:
    "Hey, this is Shahtaz. I am a software developer by passion, and a full-stack alchemist by choice!",
  expertise:
    "I’m a software developer with around 2.5 years of experience. I started my journey in frontend development, where I enjoyed turning UI designs into working prototypes that worked smoothly across different browsers and devices. Working on interfaces helped me understand user experience, consistency, and how small details in layout or behavior can make a big difference.\n\nAs I grew, I moved into backend development and found a real interest in solving problems behind the scenes. I focus on writing clean, readable code and building backend systems that are efficient, reliable, and easy to maintain. When I design a feature, I always think about performance, structure, and how the system will behave in real usage. I like working on projects where I can take ownership, understand the full flow, and build things that actually help users and teams.",
  my_story:
    "I’m a software developer with around 2.5 years of experience. I started my journey in frontend development, where I enjoyed turning UI designs into working prototypes that worked smoothly across different browsers and devices. Working on interfaces helped me understand user experience, consistency, and how small details in layout or behavior can make a big difference.\n\nAs I grew, I moved into backend development and found a real interest in solving problems behind the scenes. I focus on writing clean, readable code and building backend systems that are efficient, reliable, and easy to maintain. When I design a feature, I always think about performance, structure, and how the system will behave in real usage. I like working on projects where I can take ownership, understand the full flow, and build things that actually help users and teams.",
  key_focus_areas: ["React", "FastAPI", "Django", "Node JS"],
  language_and_frameworks: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  tools_and_database: ["Node.js", "FastAPI", "Django", "PostgreSQL"],
  other_competency: ["Git", "Docker", "AWS"],
};

export default async function Home() {
  const [
    skillsData,
    expertiseResponse,
    projectListResponse,
    experienceResponse,
    achievementRes,
    blogResponse,
  ] = await Promise.all([
    fetchSkills(),
    fetchExpertise(),
    fetchProjects(1, 10),
    fetchExperiences(),
    fetchAchievements(),
    fetchBlogs(1, 4),
  ]);

  return (
    <MainLayout>
      <Homapage
        data={skillsData.data || DEFAULT_SKILLS_DATA}
        expertises={expertiseResponse?.data || []}
        projects={projectListResponse.data.results || []}
        experiences={experienceResponse?.data || []}
        achievements={achievementRes?.data.flat() || []}
        blogs={blogResponse?.data}
      />
    </MainLayout>
  );
}
