import React from "react";
import moment from "moment";
import { PencilLine, TrendingUp } from "lucide-react";
import { Text, Title } from "@/components/ui/typography";
import { BlogBasicProps } from "@/lib/api-service/blog";

interface BlogPerformanceProps {
  blogs: BlogBasicProps[];
}

const BlogPerformance = ({ blogs }: BlogPerformanceProps) => {
  return (
    <div className="rounded-2xl p-6 dark:bg-white/5 bg-white flex flex-col">
      <div className="flx gap-2">
        <div className="h-10 w-10 center bg-white/10 rounded-lg">
          <PencilLine size={16} className="text-blue-500" />
        </div>
        <Title variant="xs">Top Blog Performance</Title>
      </div>

      {/* This container will be scrollable if content overflows */}
      <div className="flex-1 mt-6">
        {blogs.map((post, index) => (
          <div
            key={post.id}
            className={`py-3.5 ${
              index == blogs.length - 1 ? "" : "border-b border-b-white/10"
            }`}
          >
            <Title variant="xs">{post.title}</Title>
            <div className="flex items-center justify-between text-xs mt-2 text-muted-foreground">
              <div className="flx gap-2">
                <TrendingUp size={12} />
                <Text variant="xs">{post.view_count} reads</Text>
              </div>
              <Text variant="xs">
                {moment(post.published_at).format("DD MMM YYYY")}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPerformance;
