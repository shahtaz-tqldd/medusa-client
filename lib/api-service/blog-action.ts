"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
