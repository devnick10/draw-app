import "dotenv/config";
import { WebSocketServer, type WebSocket } from "ws";
import { checkAuth } from "./lib/checkAuth";
import { prisma, ShapeType } from "@repo/db";
import { MessageSchema } from "./schema";
const wss = new WebSocketServer({ port: 8080 });
const BASE_URL = process.env.BASE_URL;
interface User {
  userId: string;
  socket: WebSocket;
}

const room = new Map<string, User[]>();

wss.on("connection", (ws, req) => {
  const { searchParams } = new URL(req.url!, BASE_URL);
  const token = searchParams.get("token") || "";

  const userId = checkAuth(token);
  if (!userId) {
    ws.close(1008, "Unauthorized");
    return;
  }

  ws.on("error", console.error);

  ws.on("message", async (data) => {
    // TODO : add check and db calls and
    const parsedData = JSON.parse(data.toString());
    const result = MessageSchema.safeParse(parsedData);
    if (!result.success) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "invalid inputs",
        }),
      );
      return;
    }

    // join room
    if (result.data.type === "join_room") {
      const { roomId } = result.data;
      if (!room.has(roomId)) {
        room.set(roomId, []);
      }
      room.get(roomId)?.push({ userId, socket: ws });
      return;
    }

    // leave room
    if (result.data.type === "leave_room") {
      const { roomId } = result.data;

      room.set(
        roomId,
        room
          .get(roomId)
          ?.filter((user) => user.socket !== ws && user.userId === userId) ||
        [],
      );
      return;
    }

    if (result.data.type === "shape") {
      const { roomId, shape } = result.data;
      const myRoom = room.get(roomId);

      await prisma.shape.create({
        data: {
          userId,
          roomId,
          type: shape.type.toUpperCase() as ShapeType,
          data: shape,
        },
      });

      myRoom?.forEach((user) =>
        user.socket.send(
          JSON.stringify({
            type: "shape",
            roomId,
            shape,
          }),
        ),
      );

      return;
    }

    ws.send(data.toString());
  });
});
