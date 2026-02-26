import {
  IconArrowRight,
  IconCircle,
  IconEraser,
  IconGrid3x3,
  IconHandFinger,
  IconLayersDifference,
  IconLine,
  IconPencil,
  IconRectangle,
  IconShape3,
  IconStackBackward,
} from "@tabler/icons-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <IconPencil className="w-5 h-5 text-white" />
            </div>
            <span className="text-background">Canvas</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/signin"
              className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            Start Drawing <IconArrowRight className="w-4 h-4" />
          </Link>
          <button className="px-8 py-3 border-2 text-background border-gray-300 rounded-full font-medium hover:border-gray-400 transition">
            Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="bg-linear-to-b from-gray-50 to-white border border-gray-200 rounded-2xl p-1 overflow-hidden">
          <div className="bg-white rounded-xl p-8 aspect-video border border-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <IconGrid3x3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Canvas Preview Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
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
              <IconPencil className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">
              Multiple Drawing Tools
            </h3>
            <p className="text-gray-600">
              Freehand pen, rectangles, circles, lines, arrows, and text tools
              to express your creativity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
              <IconStackBackward className="w-6 h-6 text-white" />
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
              <IconLayersDifference className="w-6 h-6 text-white" />
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
              <IconHandFinger className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Zoom & Pan</h3>
            <p className="text-gray-600">
              Zoom from 10% to 300% with smooth mouse wheel scrolling and pan
              with middle-click drag.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
              <IconShape3 className="w-6 h-6 text-white" />
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
              <IconGrid3x3 className="w-6 h-6 text-white" />
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

      {/* Tools Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-black mb-4">
            Available Tools
          </h2>
          <p className="text-xl text-gray-600">
            A complete toolkit for drawing and sketching
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Pen", icon: IconPencil },
            { name: "Rectangle", icon: IconRectangle },
            { name: "Circle", icon: IconCircle },
            { name: "Line", icon: IconLine },
            { name: "Arrow", icon: IconArrowRight },
            { name: "Text", icon: IconGrid3x3 },
            { name: "Eraser", icon: IconEraser },
            { name: "Select", icon: IconLayersDifference },
          ].map((tool) => (
            <div
              key={tool.name}
              className="border border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-medium text-gray-900">{tool.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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
            Launch Canvas <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <IconPencil className="w-4 h-4 text-white" />
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
    </div>
  );
}
