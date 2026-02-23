"use client";

import { useAppContext } from "@/context";
import { Button } from "@repo/ui/button";
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
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 h-14 border-b border-neutral-700 bg-background backdrop-blur">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition"
      >
        <IconPencil size={22} />
        <span>Draw App</span>
      </Link>

      {/* Right Section */}
      {!user ? (
        <div className="flex items-center gap-3">
          <Link href="/signin">
            <Button variant="secondary">Signin</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Signup</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-700 text-sm font-medium">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-neutral-300">{user.username}</span>
          </div>

          {/* Logout */}
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <IconLogout size={16} />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};
