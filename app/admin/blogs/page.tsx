import DashboardLayout from "@/layouts/admin-layout";
import { fetchBlogs } from "@/lib/api-service/blog";
import AdminBlogPage from "@/templates/admin/blogs";

export default async function AdminBlog() {
  const blogResponse = await fetchBlogs(1, 10);
  return (
    <DashboardLayout>
      <AdminBlogPage blogs={blogResponse?.data?.results.flat() || []} />
    </DashboardLayout>
  );
}
