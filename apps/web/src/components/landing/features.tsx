import { Grid3x3, Layers, Pencil, Shapes, Undo2, Zap } from "lucide-react";
import React from "react";
export const Features: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-black mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to create beautiful drawings and designs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">
            Multiple Drawing Tools
          </h3>
          <p className="text-gray-600">
            Freehand pen, rectangles, circles, lines, arrows, and text tools to
            express your creativity.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Undo2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">Undo/Redo</h3>
          <p className="text-gray-600">
            Full action history with unlimited undo and redo. Never lose your
            work with complete version control.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">Layers Panel</h3>
          <p className="text-gray-600">
            Organize your elements with a full-featured layers panel. Manage,
            reorder, and delete elements easily.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">Zoom & Pan</h3>
          <p className="text-gray-600">
            Zoom from 10% to 300% with smooth mouse wheel scrolling and pan with
            middle-click drag.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Shapes className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">
            Customizable Colors
          </h3>
          <p className="text-gray-600">
            Full color picker for strokes and fills. Support for transparency
            and custom stroke widths.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
            <Grid3x3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">
            Minimalist Design
          </h3>
          <p className="text-gray-600">
            Clean, distraction-free interface that gets out of your way so you
            can focus on creating.
          </p>
        </div>
      </div>
    </section>
  );
};
