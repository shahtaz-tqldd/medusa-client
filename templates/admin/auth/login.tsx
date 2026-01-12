"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SwithDarkMode from "@/components/themes/switch-theme";
import { Text, Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";

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
          credentials: "include",
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

      router.push("/admin");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-screen center px-4 bg-gray-100 dark:bg-[#111]">
      <Card className="max-w-md w-full">
        <div className="center">
          <div className="h-12 w-12 rounded-xl center bg-emerald-500/10 dark:bg-lime-400/10">
            <h2 className="text-emerald-600 dark:text-lime-400 text-xl font-semibold">
              SR
            </h2>
          </div>
        </div>
        <Title className="text-center mt-3" variant="xs">
          Login to Admin Panel
        </Title>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <div className="space-y-1.5">
            <Text variant="xs">Email</Text>
            <Input
              type="text"
              placeholder="Put your admin email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>

          <div className="relative space-y-1.5">
            <Text variant="xs">Password</Text>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Hope you did not forget your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-6 flbx">
          <SwithDarkMode />
          <Link
            href="/"
            className="bg-emerald-500/10 dark:bg-lime-500/10 dark:text-lime-400 text-emerald-600 hover:bg-emerald-500/15 hover:dark:bg-lime-500/15 font-semibold py-2 px-4 text-xs tr rounded-full"
          >
            Go Back
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default LoginPage;
