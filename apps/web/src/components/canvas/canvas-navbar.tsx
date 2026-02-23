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
    <nav className="fixed top-0 left-0 w-full h-14 px-6 flex items-center justify-between bg-zinc-900 border-b border-zinc-800 z-50 backdrop-blur">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <IconArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-lg font-semibold text-white">Draw App</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 text-sm">
        {/* Room ID */}
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Room:</span>
          <span className="text-white font-medium">{roomId}</span>

          <button onClick={handleCopy} className="hover:text-white transition">
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        </div>

        {/* Leave Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
        >
          <IconLogout size={16} />
          Leave
        </button>
      </div>
    </nav>
  );
};
