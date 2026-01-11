"use server"
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function createAchievement(payload: FormData) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/services/achievements/create/`, {
    method: "POST",
    body: payload,
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

export async function updateAchievement(id: string, payload: FormData) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/services/achievements/update/${id}/`, {
    method: "PATCH",
    body: payload,
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

export async function deleteAchievement(id: string) {
  const cookieState = await cookies()
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/services/achievements/delete/${id}/`, {
    method: "DELETE",
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
