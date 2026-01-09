"use server";

import { cookies } from "next/headers";
import { apiFetch } from "./client";
import { DataResponse, PaginatedResponse } from "./_types";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface ProjectBasicProps {
  id: string;
  title: string;
  type: string;
  featured_image_url: string;
  created_at: string;
}

export interface ProjectDetailsProps {
  id: string;
  title: string;
  type: string;
  description: string;
  featured_image_url: string;
}

export async function fetchProjects(page = 1, page_size = 10) {
  const params = new URLSearchParams({
    offset: ((page - 1) * page_size).toString(),
    limit: page_size.toString(),
  });
  return apiFetch<DataResponse<PaginatedResponse<ProjectBasicProps[]>>>(
    `/projects/list?${params.toString()}`,
    {
      cache: "no-store"
    }
  );
}


export async function fetchBlogDetails(slug: string) {
  return apiFetch<DataResponse<ProjectDetailsProps>>(`/projects/${slug}`, {
    cache: "no-store"
  });
}


export async function createProject(formData: FormData) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/projects/create`, {
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