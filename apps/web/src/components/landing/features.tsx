import { features } from "@/constant/features";
import { Grid3x3, Layers, Pencil, Shapes, Undo2, Zap } from "lucide-react";
import React from "react";
export const Features: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-script  text-black mb-1">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 font-sans">
          Everything you need to create beautiful drawings and designs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition"
            >
              <div className="size-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <Icon className="size-6 text-white" />
              </div>

              <h3 className="text-2xl font-semibold  font-sans text-black mb-1">
                {feature.title}
              </h3>

              <p className="text-gray-600 font-poppins">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
