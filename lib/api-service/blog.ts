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
  slug: string;
  category: { id: string; name: string };
  view_count: number;
  published_at: Date;
  reading_time: number;
  content_blocks: {
    id: string;
    block_type: string,
    order: number,
    text_content?: object;
    code_content?: object;
    heading_content?: object;
  },
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
      cache: "no-store"
    }
  );
}


export async function fetchBlogDetails(slug: string) {
  return apiFetch<DataResponse<BlogDetailsProps>>(`/blogs/${slug}`, {
    cache: "no-store"
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
    cache: "no-store",
    next: {
      tags: ["blog-categories"],
    },
  });
}
