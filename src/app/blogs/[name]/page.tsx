import Layout from "@/layouts/main";
import BlogDetailsPage from "@/templates/blogs/blog-details";

type Params = Promise<{ name: string }>;

export default async function BlogDetails({ params }: { params: Params }) {
  const { name } = await params;
  return (
    <Layout>
      <BlogDetailsPage name={name} />
    </Layout>
  );
}