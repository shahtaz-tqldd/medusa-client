import MainLayout from "@/layouts/main-layout";
import { fetchBlogDetails, fetchBlogs } from "@/lib/api-service/blog";
import BlogDetailsPage from "@/templates/blogs/blog-details";

type Params = Promise<{ name: string }>;

export default async function BlogDetails({ params }: { params: Params }) {
  const { name } = await params;
  const blogResponse = await fetchBlogDetails(name);
  const blogList = await fetchBlogs(1, 4, name);
  return (
    <MainLayout>
      <BlogDetailsPage
        blog={blogResponse?.data}
        blogs={blogList.data.results?.flat() || []}
      />
    </MainLayout>
  );
}
