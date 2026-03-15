 "use client";

import { useAppContext } from "@/context";
import { signinApi, signupApi } from "@/lib/api/auth";
import { AuthForm } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCustom } from "../ui/spinner";
type AuthMode = "signin" | "signup";

export const AuthPage: React.FC<{ isSignin: boolean }> = ({ isSignin }) => {
  const { setUser } = useAppContext();

  const [loading, setLoading] = useState(false);
  const mode: AuthMode = isSignin ? "signin" : "signup";
  const [form, setForm] = useState<AuthForm>({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const handleChange =
    (key: keyof AuthForm) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const submitMap = {
    signin: async () => {
      try {
        setLoading(true);

        const { user, token } = await signinApi(form);

        localStorage.setItem("token", token);
        setUser(user)

        router.push("/dashboard");
        toast.success("Signin successfully.");
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setLoading(false);
      }
    },
    signup: async () => {
      try {
        setLoading(true);

        const { user, token } = await signupApi(form);

        localStorage.setItem("token", token);
        setUser(user)

        router.push("/dashboard");
        toast.success("Signup successfully.");
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-black font-inter">
      <div className="w-90 rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg flex gap-4 flex-col">
        <div className="mb-2 text-center">
          <h1 className="font-semibold font-poppins text-2xl  text-black dark:text-white">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="font-sans text-neutral-700 dark:text-zinc-400 ">
            {mode === "signin"
              ? "Sign in to your account."
              : "Create a new account."}
          </p>
        </div>

        {mode === "signup" && (
          <div className="flex flex-col gap-2 font-sans">
            <label className="text-sm text-gray-700 dark:text-zinc-300 ">
              Username
            </label>
            <input
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              value={form.username ?? ""}
              onChange={handleChange("username")}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 font-sans">
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

        <div className="flex flex-col gap-2 font-sans">
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
        <div className="flex justify-center items-center flex-col font-sans">
          <Link
            className="text-sm font-sans text-neutral-700 dark:text-zinc-400 hover:underline text-center"
            href={mode === "signin" ? "/signup" : "/signin"}
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Link>

          <button
            onClick={submitMap[mode]}
            className=" flex w-full max-w-sm items-center justify-center gap-2 px-8 py-2 mt-2 bg-black text-white rounded-md font-medium font-sans  hover:bg-gray-900 transition"
          >
            {loading && <SpinnerCustom />}

            {loading
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
                ? "Sign in"
                : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};
