import "dotenv/config";
import { WebSocketServer, type WebSocket } from "ws";
import { checkAuth } from "./lib/checkAuth";
import { prisma } from "@repo/db";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  userId: string;
  socket: WebSocket;
}

const room = new Map<string, User[]>();

wss.on("connection", (ws, req) => {
  const { searchParams } = new URL(req.url!, "http://localhost");
  const token = searchParams.get("token") || "";

  const userId = checkAuth(token);
  if (!userId) {
    ws.close(1008, "Unauthorized");
    return;
  }

  ws.on("error", console.error);

  ws.on("message", async (data) => {
    // TODO : add check and db calls and userId input validation;
    const parsedData = JSON.parse(data as unknown as string);

    // join room
    if (parsedData.type === "join_room") {
      //@ts-ignore
      const roomId = parsedData.roomId;
      room.set(roomId, []);
      room.get(roomId)?.push({ userId, socket: ws });
      return;
    }

    // leave room
    if (parsedData.type === "leave_room") {
      //@ts-ignore
      const roomId = parsedData.roomId;

      room.set(
        roomId,
        room
          .get(roomId)
          ?.filter((user) => user.socket !== ws && user.userId === userId) ||
        [],
      );
      return;
    }

    // chat
    if (parsedData.type === "chat") {
      /**
       * {
       *  type:"chat",
       *  message:"mssage",
       *  roomId:"id"
       * }
       */

      //@ts-ignore
      const roomId = parsedData.roomId;
      //@ts-ignore
      const message = parsedData.message;
      const myRoom = room.get(roomId);

      // @ts-ignore
      await prisma.chat.create({
        data: {
          message,
          roomId,
          userId,
        },
      });

      myRoom?.forEach((user) =>
        user.socket.send(
          JSON.stringify({
            type: "chat",
            message,
            roomId,
          }),
        ),
      );

      return;
    }

    ws.send(data.toString());
  });
});
