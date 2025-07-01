"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/buttons/primary-button";
import BodyText from "@/components/text/body-text";
import { Input } from "@/components/ui/input";
import SwithDarkMode from "@/components/darkmode/dashbord-dark";
import Link from "next/link";

import { useRouter } from "next/navigation";

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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/`,
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
        <h2 className="text-xl font-medium text-center opacity-80">
          Login to Admin Panel
        </h2>
        <BodyText className="text-center mt-1">Shahtaz Rahman</BodyText>

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

          <Button type="submit" variant="nemo" size="base">
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
