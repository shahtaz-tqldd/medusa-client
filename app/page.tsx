import MainLayout from "@/layouts/main-layout";
import { fetchBlogs } from "@/lib/api-service/blog";
import Homapage from "@/templates/home";

export default async function Home() {
  const blogResponse = await fetchBlogs(1, 4);
  return (
    <MainLayout>
      <Homapage blogs={blogResponse?.data} />
    </MainLayout>
  );
}
