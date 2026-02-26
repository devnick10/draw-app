import { Pencil } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <Pencil className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Canvas</span>
        </div>
        <div className="flex gap-6 text-gray-600">
          <a href="#" className="hover:text-gray-900 transition">
            GitHub
          </a>
          <a href="#" className="hover:text-gray-900 transition">
            Docs
          </a>
          <a href="#" className="hover:text-gray-900 transition">
            Issues
          </a>
        </div>
      </div>
    </footer>
  );
};
