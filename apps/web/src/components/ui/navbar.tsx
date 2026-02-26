"use client";

import { useAppContext } from "@/context";
import { IconLogout, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Navbar: React.FC = () => {
  const { user, setUser } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <IconPencil size={18} className="text-white" />
          </div>
          <span>Draw App</span>
        </Link>

        {/* Right Section */}
        {!user ? (
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
        ) : (
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-medium">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-[17px] text-muted-foreground font-medium">
                {user.username}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-6  py-2 rounded-full font-medium hover:bg-neutral-200 hover:text-foreground transition flex items-center gap-2"
            >
              <IconLogout size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
