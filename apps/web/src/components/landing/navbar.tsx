"use client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Pencil className="w-5 h-5 text-white" />
          </div>
          <span>Canvas</span>
        </Link>

        <div className="flex gap-2">
          <div className="flex items-center gap-8 mr-8">
            <button
              onClick={() => scrollToSection("features")}
              className="px-6 py-2 rounded-full font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("tools")}
              className="px-6 py-2 rounded-full font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Tools
            </button>
          </div>

          <Link
            href="/signin"
            className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  );
};
