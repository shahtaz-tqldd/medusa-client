import MainLayout from "@/layouts/main-layout";
import BlogDetailsPage from "@/templates/blogs/blog-details";

type Params = Promise<{ name: string }>;

export default async function BlogDetails({ params }: { params: Params }) {
  const { name } = await params;
  return (
    <MainLayout>
      <BlogDetailsPage name={name} />
    </MainLayout>
  );
}
