"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { BlogBasicProps } from "@/lib/api-service/blog";
import { Eye, PenLine, Plus, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables/reusable-table";
import TechBadge from "@/components/ui/badge";
import { colors } from "@/lib/colors";
import { formatTimeFromNow } from "@/lib/date";
import BlogDetailsDrawer from "./blog-details-drawer";
import { deleteBlog } from "@/lib/api-service/blog-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BlogPageProps {
  blogs: BlogBasicProps[];
}

const AdminBlogPage = ({ blogs }: BlogPageProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [blogView, setBlogView] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);

  const blogs_columns = [
    { header: "Title", accessorKey: "title" },
    { header: "Category", accessorKey: "category" },
    { header: "Total Read", accessorKey: "view_count" },
    { header: "Published", accessorKey: "published" },
    { header: "Action", accessorKey: "action" },
  ];

  const table_options = [
    {
      label: "View",
      icon: Eye,
      action: (id: string) => {
        setBlogView(true);
        setBlogId(id);
      },
    },
    {
      label: "Update",
      icon: PenLine,
      action: (id: string) => {
        router.push(`/admin/blogs/${id}/update`);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      type: "delete" as const,
    },
  ];
  const blog_list =
    blogs?.map((item, index) => ({
      ...item,
      id: item.slug,
      title: <Link href={`/blogs/${item.slug}`}>{item.title}</Link>,
      published: (
        <span className="opacity-60">
          {formatTimeFromNow(item.published_at)}
        </span>
      ),
      view_count: <span className="opacity-60">{item.view_count}</span>,
      category: (
        <TechBadge color={colors[index % 3]}>{item.category.name}</TechBadge>
      ),
    })) || [];

  const total_item = blogs?.length || 0;

  const handleDeleteBlog = async (id: string) => {
    const res = await deleteBlog(id);
    if (res?.success) {
      toast.success(res?.message || "Blog Deleted Successfully!");
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to delete Blog!");
    }
  };

  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Blogs & Articles</Title>
          <Text variant="sm">
            Technical aritcles to publish on your portfolio
          </Text>
        </div>
        <Link href="/admin/blogs/create">
          <Button>
            <Plus size={14} />
            Write Article
          </Button>
        </Link>
      </div>

      <ReusableTable
        data={blog_list}
        columns={blogs_columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={total_item}
        table_options={table_options}
        onDeleteConfirm={handleDeleteBlog}
        deleteLoading={false}
        className="mt-4"
      />
      <BlogDetailsDrawer
        isOpen={blogView}
        setIsOpen={setBlogView}
        blogId={blogId}
        admin_view
      />
    </div>
  );
};

export default AdminBlogPage;
