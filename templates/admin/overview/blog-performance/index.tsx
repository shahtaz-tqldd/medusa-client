import React from "react";
import { TrendingUp } from "lucide-react"; // Using lucide-react for the icon
import { Text, Title } from "@/components/ui/typography";

// --- 1. Define the BlogPost Interface ---
// You can move this to a central types file if you prefer.
export interface BlogPost {
  id: string;
  title: string;
  readCount: number;
  publishedDate: string; // ISO 8601 string
}

// --- 2. Demo Data ---
// You can replace this with your actual data import.
const demoBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Server-Side Rendering with Next.js",
    readCount: 2101,
    publishedDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 20
    ).toISOString(), // 20 days ago
  },
  {
    id: "2",
    title: "Getting Started with TypeScript in 2024 in Perfect way",
    readCount: 1542,
    publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: "3",
    title: "Styling in React in 2026: Tailwind CSS vs. CSS Modules",
    readCount: 987,
    publishedDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 12
    ).toISOString(), // 12 days ago
  },
];

// --- 3. Helper Functions ---

// Formats the read count (e.g., 1542 -> 1.5k)
const formatReadCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// Formats the date to a more readable format
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// --- 4. The Component ---

interface BlogPerformanceProps {
  blogPosts?: BlogPost[]; // Make prop optional to use demo data by default
}

const BlogPerformance = ({
  blogPosts = demoBlogPosts,
}: BlogPerformanceProps) => {
  // Sort posts by readCount in descending order and take the top 5
  const topBlogPosts = [...blogPosts]
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, 5);

  return (
    <div className="rounded-2xl p-6 dark:bg-white/5 bg-white flex flex-col">
      <Title variant="xs">Top Blog Performance</Title>

      {/* This container will be scrollable if content overflows */}
      <div className="flex-1 mt-6">
        {topBlogPosts.map((post, index) => (
          <div
            key={post.id}
            className={`py-3.5 ${
              index == topBlogPosts.length - 1
                ? ""
                : "border-b border-b-white/10"
            }`}
          >
            <Title variant="xs">{post.title}</Title>
            <div className="flex items-center justify-between text-xs mt-2 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <Text variant="sm" className="!text-sm">
                  {formatReadCount(post.readCount)} reads
                </Text>
              </div>
              <Text variant="sm" className="!text-sm">
                {formatDate(post.publishedDate)}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPerformance;
