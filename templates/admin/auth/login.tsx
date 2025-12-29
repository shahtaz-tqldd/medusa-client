"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SwithDarkMode from "@/components/themes/switch-theme";
import { Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrUsername,
            password: password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.detail || "Login failed");
      }

      const { access_token, refresh_token } = result.data;

      // Set cookies (you can set expiration based on your needs)
      localStorage.setItem("access_token", access_token); // 1 day
      localStorage.setItem("refresh_token", refresh_token);

      // Redirect to dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-screen w-screen center px-4 bg-gray-100 dark:bg-[#111]">
      <div className="rounded-2xl shadow max-w-md w-full p-10 pt-8 bg-white dark:bg-white/5">
        <div className="center">
          <div className="h-12 w-12 dark:bg-white/5 bg-blue-500/10 rounded-xl center">
            <h2 className="dark:text-blue-500 text-blue-700 text-xl font-semibold">
              SR
            </h2>
          </div>
        </div>
        <Title className="text-center mt-4" variant="sm">
          Login to Admin Panel
        </Title>

        <form onSubmit={handleSubmit} className="space-y-5 mt-10">
          <div>
            <Input
              type="text"
              placeholder="Email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

          <Button type="submit" className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-10 flbx">
          <SwithDarkMode />
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-500 hover:text-black/80 hover:dark:text-white/80 tr"
          >
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
