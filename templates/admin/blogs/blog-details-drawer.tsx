import React, { useEffect, useState } from "react";
import moment from "moment";

// components
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { BlogContentBlock, RenderBlogs } from "@/templates/blogs/blog-details";
import { BlogDetailsProps } from "@/lib/api-service/blog";
import TechBadge from "@/components/ui/badge";
import { Title } from "@/components/ui/typography";

// function
import { fetchBlogById } from "@/lib/api-service/blog-action";

// icons
import { Calendar, Clock } from "lucide-react";

interface BlogDetailsDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  blogId: string | null;
  admin_view?: boolean;
}

const BlogDetailsDrawer: React.FC<BlogDetailsDrawerProps> = ({
  isOpen,
  setIsOpen,
  blogId,
  admin_view,
}) => {
  const [blog, setBlog] = useState<BlogDetailsProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !blogId) return;

    const loadProject = async () => {
      setLoading(true);
      try {
        const res = await fetchBlogById(blogId, admin_view);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [isOpen, blogId, admin_view]);

  if (!isOpen) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerTitle hidden></DrawerTitle>
        {loading && <p className="p-6">Loading...</p>}
        {!loading && blog && (
          <div className="w-full">
            <Title variant="lg">{blog.title}</Title>
            <div className="flex text-sm gap-6 mt-8">
              <TechBadge>{blog.category.name}</TechBadge>
              <p className="opacity-60 flx gap-2">
                <Clock size={14} />
                {blog.reading_time || 7} mins read
              </p>
              <p className="opacity-60 flx gap-2">
                <Calendar size={14} />
                {moment(blog.published_at).format("DD MMM YYYY")}
              </p>
            </div>
            {Array.isArray(blog.content_blocks) ? (
              <RenderBlogs
                content_blocks={blog.content_blocks as BlogContentBlock[]}
              />
            ) : (
              <div className="text-red-500">Invalid content blocks</div>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default BlogDetailsDrawer;
