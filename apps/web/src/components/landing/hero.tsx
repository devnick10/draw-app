import { IconGrid3x3 } from "@tabler/icons-react";
import { ArrowRight, Grid3X3 } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="mb-8 inline-block">
        {/* <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"> */}
        {/* Free to use, forever */}
        {/* </span> */}
      </div>

      <h1 className="text-7xl font-bold text-black mb-6 text-balance">
        Draw. Create. Sketch.
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
        A minimalist canvas drawing application with powerful tools for
        sketching, designing, and creating. Infinite canvas with undo/redo,
        layers, and real-time editing.
      </p>

      <div className="flex gap-4 justify-center mb-16">
        <Link
          href="/signin"
          className="px-8 py-3 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-gray-900 transition"
        >
          Start Drawing <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="px-8 py-3 border-2 text-background border-gray-300 rounded-full font-medium hover:border-gray-400 transition">
          Watch Demo
        </button>
      </div>

      {/* Hero Image */}
      <div className="bg-linear-to-b from-gray-50 to-white border border-gray-200 rounded-2xl p-1 overflow-hidden">
        <div className="bg-white rounded-xl p-8 aspect-video border border-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Grid3X3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Canvas Preview Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};
