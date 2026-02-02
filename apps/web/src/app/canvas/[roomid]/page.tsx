"use client";
import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        className="bg-black"
        ref={canvasRef}
        width={10000}
        height={2000}
      ></canvas>
    </div>
  );
}
