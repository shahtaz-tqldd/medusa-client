"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { apiFetch } from "./client";
import { DataResponse, PaginatedResponse } from "./_types";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
  return apiFetch<DataResponse<PaginatedResponse<BlogBasicProps[]>>>(`/blogs/list?page=${page}&page_size=${page_size}&exclude_slug=${exclude_slug}&ordering=-${sorted_by}`, {
    cache: "no-store"
  });
}


export async function fetchBlogDetails(slug: string) {
  return apiFetch<DataResponse<BlogDetailsProps>>(`/blogs/${slug}`, {
    cache: "no-store"
  });
}


export async function createBlog(formData: FormData) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/blogs/create`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
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

export async function createBlogCategory(name: string) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/blogs/categories/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  revalidateTag("blog-categories", {});

  return res.json();
}
