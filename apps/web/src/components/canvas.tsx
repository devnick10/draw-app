"use client"
import { IconButton } from './Icon-button'
import { IconCircle, IconPencil, IconRectangle } from '@tabler/icons-react'
import { useWindowSize } from "@/hooks/useWindowSize";
import React, { useEffect, useRef, useState } from "react";
import { Tool } from '@/lib/types';
import { Game } from '@/draw/Game';


export const Canvas: React.FC<{ roomId: string, socket: WebSocket }> = ({ roomId, socket }) => {
    const { height, width } = useWindowSize()
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")
    const [game, setGame] = useState<Game>()

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket)
            setGame(g);

            return () => {
                g.destroy()
            }
        }
    }, [canvasRef]);

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game])

    return (
        <div className="h-screen overflow-hidden ">
            <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <canvas
                className="bg-black"
                ref={canvasRef}
                width={width}
                height={height}
            ></canvas>
        </div>
    );
}

const Topbar: React.FC<{
    selectedTool: Tool,
    setSelectedTool: (t: Tool) => void
}> = ({
    selectedTool,
    setSelectedTool
}) => {
        return (
            <div className="fixed top-5 left-5 text-2xl flex gap-2">
                <IconButton
                    isActive={selectedTool === "pencil"}
                    Icon={IconPencil}
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                />
                <IconButton
                    isActive={selectedTool === "rect"}
                    Icon={IconRectangle}
                    onClick={() => {
                        setSelectedTool("rect")
                    }}
                />
                <IconButton
                    isActive={selectedTool === "circle"}
                    Icon={IconCircle}
                    onClick={() => {
                        setSelectedTool("circle")
                    }}
                />
            </div>
        )
    }
