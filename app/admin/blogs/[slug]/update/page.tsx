import DashboardLayout from "@/layouts/admin-layout";
import CreateBlogPage from "@/templates/admin/blogs/create-blog";
import { fetchBlogCategory, fetchBlogDetails } from "@/lib/api-service/blog";

export default async function AdminBlogUpdate({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryData = await fetchBlogCategory();
  const blogRes = await fetchBlogDetails(slug, true);
  return (
    <DashboardLayout>
      <CreateBlogPage
        categories={categoryData.data}
        initialData={blogRes.data || {}}
        slug={slug}
      />
    </DashboardLayout>
  );
}
