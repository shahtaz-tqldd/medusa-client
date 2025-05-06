import Layout from "@/layouts/main";
import BlogDetailsPage from "@/templates/blogs/blog-details";

export default async function BlogDetails({ params }: { params: { name: string } }) {
  const {name} = await params
  return (
    <Layout>
      <BlogDetailsPage name={name} />
    </Layout>
  );
}
