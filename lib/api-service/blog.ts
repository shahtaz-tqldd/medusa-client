import { apiFetch } from "./client";
import { DataResponse, PaginatedResponse } from "./_types";

export interface BlogBasicProps {
  id: string;
  title: string;
  slug: string;
  category: { id: string; name: string };
  view_count: number;
  published_at: Date;
  featured_image: string;
}

export interface BlogDetailsProps {
  id: string;
  title: string;
  subtitle?: string;
  featured_image?: string;
  excerpt?: string;
  slug: string;
  category: { id: string; name: string };
  view_count: number;
  published_at: Date;
  reading_time: number;
  tags: string[];
  status?: 'published' | 'draft';
  content_blocks: {
    id: string;
    block_type: string,
    order: number,
    text_content?: object;
    code_content?: object;
    heading_content?: object;
  }[],
}

export async function fetchBlogs(page = 1, page_size = 10, exclude_slug = "", sorted_by = "") {
  const params = new URLSearchParams({
    offset: ((page - 1) * page_size).toString(),
    limit: page_size.toString(),
  });
  if (sorted_by) {
    params.set("ordering", `-${sorted_by}`)
  }
  if (exclude_slug) {
    params.set("exclude_slug", exclude_slug)
  }
  return apiFetch<DataResponse<PaginatedResponse<BlogBasicProps[]>>>(
    `/blogs/list?${params.toString()}`,
    {
      revalidate: 900, // Revalidate every 15 minutes
      tags: ["blogs"],
    }
  );
}


export async function fetchBlogDetails(slug: string, admin_view: boolean = false) {
  let fetchURL = `/blogs/${slug}/`
  if (admin_view) {
    fetchURL += '?admin_view=true'
  }
  return apiFetch<DataResponse<BlogDetailsProps>>(fetchURL, {
    revalidate: admin_view ? false : 900,
    tags: ["blogs", `blog-${slug}`],
  });
}

// -----------
export interface BlogCategory {
  id: string;
  name: string;
}

export async function fetchBlogCategory() {
  return apiFetch<DataResponse<BlogCategory[]>>("/blogs/categories/list", {
    auth: true,
    revalidate: false, // No cache for auth endpoints
    tags: ["blog-categories"],
  });
}
