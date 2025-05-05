import Layout from "@/layouts/main";
import BlogDetailsPage from "@/templates/blogs/blog-details";

export default function BlogDetails({ params }: { params: { name: string } }) {
  return (
    <Layout>
      <BlogDetailsPage name={params?.name} />
    </Layout>
  );
}
