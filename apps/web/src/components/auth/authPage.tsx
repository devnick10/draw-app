import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/button";
const inputClassName =
  "py-1.5 px-2.5 dark:bg-foreground dark:text-background outline-none rounded-sm";
export const AuthPage: React.FC<{ isSignin: boolean }> = ({ isSignin }) => {

  
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="rounded-md py-2 px-4 bg-neutral-200 dark:bg-neutral-800 flex gap-2 flex-col">
        <h1 className="text-center text-2xl font-sans my-2">
          {isSignin ? "Signin" : "Signup"}
        </h1>
        {!isSignin && (
          <div className="flex flex-col gap-2">
            <label className="text-foreground font-thin" htmlFor="username">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              className={inputClassName}
              placeholder="username"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-foreground font-thin" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            className={inputClassName}
            placeholder="email"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-foreground font-thin" htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            className={inputClassName}
            placeholder="username"
          />
        </div>
        {isSignin && (
          <Link href={"/signup"}>
            If you don't have an account{" "}
            <span className="underline font-bold">signup.</span>
          </Link>
        )}
        {!isSignin && (
          <Link href={"/signin"}>
            If you allready have an account{" "}
            <span className="underline font-bold">signin</span>
          </Link>
        )}
        <Button variant="primary" className="mt-2">{isSignin ? "Signin" : "Signup"}</Button>
      </div>
    </div>
  );
};
