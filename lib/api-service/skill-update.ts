"use server";

import { cookies } from "next/headers";
import { SkillsProps } from "../api-service/skills";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export type SkillsUpdatePayload = Partial<SkillsProps>;

export async function updateSkills(
  payload: SkillsUpdatePayload
): Promise<SkillsProps> {
  const cookieState = await cookies();
  const token = cookieState.get("access_token")?.value;
  
  const res = await fetch(`${API_BASE_URL}/services/skills/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update skills");
  }

  const json = await res.json();
  return json.data;
}