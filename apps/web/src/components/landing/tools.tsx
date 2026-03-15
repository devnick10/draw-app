import { IconCircle, IconLine, IconRectangle } from "@tabler/icons-react";
import { ArrowRight, BoxSelect, Eraser, Pencil, Text } from "lucide-react";

export const Tools: React.FC = () => {
  return (
    <section
      id="tools"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-script font-medium text-black mb-1">Available Tools</h2>
        <p className="text-xl text-gray-600 font-sans">
          A complete toolkit for drawing and sketching
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "Pen", icon: Pencil },
          { name: "Rectangle", icon: IconRectangle },
          { name: "Circle", icon: IconCircle },
          { name: "Line", icon: IconLine },
          { name: "Arrow", icon: ArrowRight },
          { name: "Text", icon: Text },
          { name: "Eraser", icon: Eraser },
          { name: "Select", icon: BoxSelect },
        ].map((tool) => (
          <div
            key={tool.name}
            className="border border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium text-neutral-700 font-sans">{tool.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
