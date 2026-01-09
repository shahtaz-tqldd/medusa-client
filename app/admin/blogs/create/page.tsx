import DashboardLayout from "@/layouts/admin-layout";
import { fetchBlogCategory } from "@/lib/api-service/blog";
import CreateBlogPage from "@/templates/admin/blogs/create-blog";

export default async function AdminCreateBlog() {
  const categoryData = await fetchBlogCategory();
  return (
    <DashboardLayout>
      <CreateBlogPage categories={categoryData.data} />
    </DashboardLayout>
  );
}
