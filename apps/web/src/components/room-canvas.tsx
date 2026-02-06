"use client"
import { WS_SERVER } from "@/lib/config";
import React, { useEffect, useState } from "react";
import { Canvas } from "./canvas";

export const RoomCanvas: React.FC<{ roomId: string }> = ({ roomId }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const ws = new WebSocket(`${WS_SERVER}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    }, [])

    if (!socket) {
        return <div>Connecting to server....</div>
    }

    return <Canvas roomId={roomId} socket={socket} />
}
