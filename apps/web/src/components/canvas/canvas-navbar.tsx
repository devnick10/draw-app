"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconLogout,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";

interface CanvasNavbarProps {
  roomId: string;
  onLeave: () => void;
}

export const CanvasNavbar: React.FC<CanvasNavbarProps> = ({
  roomId,
  onLeave,
}) => {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const handleBack = () => {
    onLeave();
    router.push("/dashboard");
  };

  const handleCopy = async () => {
    const roomUrl = `${window.location.origin}/room/${roomId}`;
    await navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-6 flex items-center justify-between bg-white border-b border-gray-200 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
          <IconArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-lg font-semibold text-black">Draw App</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8 text-sm">
        {/* Room ID */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-gray-300">
          <span className="text-gray-500">Room</span>
          <span className="font-medium text-black">{roomId}</span>

          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-black transition"
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        </div>

        {/* Leave Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
        >
          <IconLogout size={16} />
          Leave
        </button>
      </div>
    </nav>
  );
};
