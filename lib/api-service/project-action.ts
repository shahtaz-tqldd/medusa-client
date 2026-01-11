"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface ProjectLink {
  id: string;
  type: string;
  label: string;
  url: string;
  created_at: string;
}

export interface ProjectImage {
  id: string;
  image_url: string;
  public_id: string;
  created_at: string;
}

export interface ProjectDetailsProps {
  id: string;
  title: string;
  description: string;
  case_study: string;
  featured_image_url: string;
  featured_image_public_id: string;
  type: string;
  tech_stacks: string[];
  features: string[];
  created_at: string;
  updated_at: string;
  links: ProjectLink[];
  images: ProjectImage[];
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

export async function fetchProjectById(id: string) {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
