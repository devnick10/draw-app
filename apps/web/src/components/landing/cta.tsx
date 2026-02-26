import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Cta: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
      <div className="bg-black rounded-2xl px-8 md:px-16 py-24 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">Ready to Create?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Start drawing now with our free, minimalist canvas application. No
          signup required.
        </p>
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition"
        >
          Launch Canvas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
