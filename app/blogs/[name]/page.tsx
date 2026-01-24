import MainLayout from "@/layouts/main-layout";
import BlogDetailsPage from "@/templates/blogs/blog-details";
import { fetchBlogDetails, fetchBlogs } from "@/lib/api-service/blog";

type Params = Promise<{ name: string }>;

// Enable ISR - regenerate page every 15 minutes
export const revalidate = 900;

// Generate static paths for all blogs at build time
export async function generateStaticParams() {
  try {
    const blogs = await fetchBlogs(1, 100); // Fetch all blog slugs
    return blogs.data.results.map((blog) => ({
      name: blog.slug,
    }));
  } catch {
    // Return empty array if API fails during build
    return [];
  }
}

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

