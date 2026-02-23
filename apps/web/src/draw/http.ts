"use client";
import { HTTP_SERVER } from "@/lib/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${HTTP_SERVER}/rooms/chats/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const messages = res.data.chats;
  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });
  return shapes;
}
