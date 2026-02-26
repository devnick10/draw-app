"use client";

import { Game } from "@/draw/Game";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Tool } from "@/lib/types";
import { IconCircle, IconPencil, IconRectangle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "../ui/Icon-button";
import { CanvasNavbar } from "./canvas-navbar";

export const Canvas: React.FC<{ roomId: string; socket: WebSocket }> = ({
  roomId,
  socket,
}) => {
  const { height, width } = useWindowSize();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>();
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const isDark = document.documentElement.classList.contains("dark");
      const g = new Game(
        canvasRef.current,
        roomId,
        socket,
        isDark ? "#000000" : "#ffffff",
      );
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, roomId, socket]);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 font-inter">
      {/* Navbar */}
      <CanvasNavbar roomId={roomId} onLeave={() => router.push("/dashboard")} />

      {/* Tool Panel */}
      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-white dark:bg-black"
      />
    </div>
  );
};

const Topbar: React.FC<{
  selectedTool: Tool;
  setSelectedTool: (t: Tool) => void;
}> = ({ selectedTool, setSelectedTool }) => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl 
        bg-white/80 dark:bg-zinc-900/80 
        backdrop-blur-lg 
        border border-zinc-200 dark:border-zinc-800
        shadow-lg"
      >
        <IconButton
          isActive={selectedTool === "pencil"}
          Icon={IconPencil}
          onClick={() => setSelectedTool("pencil")}
        />

        <IconButton
          isActive={selectedTool === "rect"}
          Icon={IconRectangle}
          onClick={() => setSelectedTool("rect")}
        />

        <IconButton
          isActive={selectedTool === "circle"}
          Icon={IconCircle}
          onClick={() => setSelectedTool("circle")}
        />
      </div>
    </div>
  );
};
