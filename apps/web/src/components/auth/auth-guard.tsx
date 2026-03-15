"use client";

import { useAppContext } from "@/context";
import { getUserApi } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCustom } from "../ui/spinner";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin");
      return;
    }

    async function getUser() {
      try {
        const { user } = await getUserApi()
        setUser(user);
      } catch (error: any) {
        toast.error(error?.message)
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [router, setUser, user]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SpinnerCustom />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};