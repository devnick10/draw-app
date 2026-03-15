import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Cta: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
      <div className="bg-black rounded-2xl px-8 md:px-16 py-24 text-center text-white">
        <h2 className="text-5xl font-semibold font-script mb-1">Ready to Create?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-sans">
          Start drawing now with our free, minimalist canvas application. No
          signup required.
        </p>
        <Link
          href="/signin"
          className="inline-flex px-6 py-2 bg-black text-white rounded-full font-poppins  items-center gap-2 hover:bg-gray-900 transition shadow-neutral-500 shadow-md border border-neutral-500"
        >
          Launch Canvas <ArrowRight className="size-5" />
        </Link>
      </div>
    </section>
  );
};
