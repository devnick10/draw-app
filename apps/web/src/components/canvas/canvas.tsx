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
      const g = new Game(canvasRef.current, roomId, socket);
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
    <div className="h-screen overflow-hidden">
      <CanvasNavbar roomId={roomId} onLeave={() => router.push("/dashboard")} />

      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

      <canvas
        className="bg-black"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};
const Topbar: React.FC<{
  selectedTool: Tool;
  setSelectedTool: (t: Tool) => void;
}> = ({ selectedTool, setSelectedTool }) => {
  return (
    <div className="fixed top-20 left-5 text-2xl flex gap-2">
      <IconButton
        isActive={selectedTool === "pencil"}
        Icon={IconPencil}
        onClick={() => {
          setSelectedTool("pencil");
        }}
      />
      <IconButton
        isActive={selectedTool === "rect"}
        Icon={IconRectangle}
        onClick={() => {
          setSelectedTool("rect");
        }}
      />
      <IconButton
        isActive={selectedTool === "circle"}
        Icon={IconCircle}
        onClick={() => {
          setSelectedTool("circle");
        }}
      />
    </div>
  );
};
