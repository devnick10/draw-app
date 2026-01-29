import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1] || "";

  const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!decode.userId) {
    ws.close(1008, "Unauthorized");
  }

  ws.on("error", console.error);
  ws.send("welcome from wss");
  ws.on("message", (data) => {
    ws.send(data.toString());
  });
});
