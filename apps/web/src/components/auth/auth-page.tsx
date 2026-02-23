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
    <div className="h-screen w-full flex justify-center items-center">
      <div className="rounded-md py-2 px-4 bg-neutral-200 dark:bg-neutral-800 flex gap-2 flex-col">
        <div className="mb-5">
          <h1 className="text-center text-2xl my-2">
            {mode === "signin" ? "Signin" : "Signup"}
          </h1>
          <p className="text-neutral-300">{`S${mode.slice(1)} to your account.`}</p>
        </div>

        {mode === "signup" && (
          <div className="flex flex-col gap-2">
            <label className="text-foreground font-thin">Username</label>
            <input
              className={inputClassName}
              value={form.username ?? ""}
              onChange={handleChange("username")}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-foreground font-thin">Email</label>
          <input
            type="email"
            className={inputClassName}
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-foreground font-thin">Password</label>
          <input
            type="password"
            className={inputClassName}
            value={form.password}
            onChange={handleChange("password")}
          />
        </div>

        <Link
          className="text-neutral-300"
          href={mode === "signin" ? "/signup" : "/signin"}
        >
          {mode === "signin"
            ? "If you don't have an account signup"
            : "If you already have an account signin"}
        </Link>

        <Button variant="primary" onClick={submitMap[mode]}>
          {mode === "signin" ? "Signin" : "Signup"}
        </Button>
      </div>
    </div>
  );
};
