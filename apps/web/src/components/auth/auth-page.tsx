"use client";

import { HTTP_SERVER } from "@/lib/config";
import { Button } from "@repo/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
type AuthMode = "signin" | "signup";

type AuthFormState = {
  email: string;
  password: string;
  username?: string;
};

const inputClassName =
  "py-1.5 px-2.5 dark:bg-neutral-500 dark:text-neutral-100 outline-none rounded-sm";

export const AuthPage: React.FC<{ isSignin: boolean }> = ({ isSignin }) => {
  const mode: AuthMode = isSignin ? "signin" : "signup";
  const [form, setForm] = useState<AuthFormState>({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();
  const handleChange =
    (key: keyof AuthFormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const submitMap = {
    signin: async () => {
      try {
        const res = await axios.post(`${HTTP_SERVER}/users/signin`, form);
        if (res.status !== 200) {
          throw new Error("Signin failed!");
        }
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Signin failed!");
      }
    },
    signup: async () => {
      try {
        const res = await axios.post(`${HTTP_SERVER}/users/signup`, form);
        if (res.status !== 201) {
          throw new Error("Signup failed!");
        }
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Signup failed!");
      }
    },
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-black font-inter">
      <div className="w-[360px] rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg flex gap-4 flex-col">
        <div className="mb-2 text-center">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            {mode === "signin"
              ? "Sign in to your account."
              : "Create a new account."}
          </p>
        </div>

        {mode === "signup" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 dark:text-zinc-300">
              Username
            </label>
            <input
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              value={form.username ?? ""}
              onChange={handleChange("username")}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 dark:text-zinc-300">
            Email
          </label>
          <input
            type="email"
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 dark:text-zinc-300">
            Password
          </label>
          <input
            type="password"
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            value={form.password}
            onChange={handleChange("password")}
          />
        </div>

        <Link
          className="text-sm text-gray-600 dark:text-zinc-400 hover:underline text-center"
          href={mode === "signin" ? "/signup" : "/signin"}
        >
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Link>

        <Button variant="primary" onClick={submitMap[mode]}>
          {mode === "signin" ? "Sign in" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};
