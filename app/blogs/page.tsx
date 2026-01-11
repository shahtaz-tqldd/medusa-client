import MainLayout from "@/layouts/main-layout";
import { fetchBlogs } from "@/lib/api-service/blog";
import BlogPage from "@/templates/blogs";

export default async function Blog() {
  const blogResponse = await fetchBlogs(1, 10);
  return (
    <MainLayout>
      <BlogPage blogs={blogResponse?.data?.results.flat() || []} />
    </MainLayout>
  );
}
