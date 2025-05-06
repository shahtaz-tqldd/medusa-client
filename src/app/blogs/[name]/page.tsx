import Layout from "@/layouts/main";
import BlogDetailsPage from "@/templates/blogs/blog-details";

export default function BlogDetails({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <Layout>
      <BlogDetailsPage name={name} />
    </Layout>
  );
}
