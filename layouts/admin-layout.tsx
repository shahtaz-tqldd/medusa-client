// app/admin/layout.tsx
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const cookieState = await cookies();
  const token = cookieState.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen flex dark:bg-[#141514] bg-gray-100/80">
      <Sidebar className="max-w-[280px] w-full h-screen border-r dark:border-r-white/10 border-r-gray-200" />
      <main className="flex-1 medusa-scroll p-8">{children}</main>
    </div>
  );
}
