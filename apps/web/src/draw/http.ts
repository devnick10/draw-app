"use client";
import { HTTP_SERVER } from "@/lib/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${HTTP_SERVER}/rooms/shapes/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { shapes } = res.data;
  return shapes;
}
