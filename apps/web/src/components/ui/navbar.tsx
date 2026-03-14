"use client";

import { useAppContext } from "@/context";
import { IconLogout, IconPencil, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Navbar: React.FC = () => {
  const { setCreateDrawingModel } = useAppContext();
  const { user, setUser } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto  py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <IconPencil size={18} className="text-white" />
          </div>
          <span className="text-sm sm:text-[1.3rem]">Draw App</span>
        </Link>

        {/* Right Section */}
        {!user && (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="px-6 py-2 rounded-full font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Signin
            </Link>

            <Link
              href="/signup"
              className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
            >
              Signup
            </Link>
          </div>
        )}
        {user && (
          <>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center px-6 py-2 bg-foreground/90 text-background rounded-md gap-2"
                onClick={() => {
                  setCreateDrawingModel(true);
                }}
              >
                <IconPlus className="size-5" />
                <span className="text-sm">New Drawing</span>
              </button>
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {/* <span className="text-[17px] text-muted-foreground font-medium">
                {user.username}
              </span> */}
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="py-2 pl-2 rounded-full font-medium hover:bg-red-100 hover:text-foreground transition flex items-center justify-center "
              >
                <IconLogout size={25} />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
