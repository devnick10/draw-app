"use client";

import { useAppContext } from "@/context";
import { HTTP_SERVER } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SpinnerCustom } from "../ui/spinner";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${HTTP_SERVER}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error(error);
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [router, setUser]);

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
