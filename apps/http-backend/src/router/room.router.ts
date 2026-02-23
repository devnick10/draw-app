import { RoomSchema } from "@repo/common/schema";
import { prisma } from "@repo/db";
import { NextFunction, Request, Response, Router } from "express";
import { authMidlleware } from "../middleware.js";
import apiError from "http-errors";

const roomRouter: Router = Router();

roomRouter.post(
  "/create",
  authMidlleware,
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId;
    const { data, success } = RoomSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        message: "Invalid inputs",
      });
      return;
    }

    const newRoom = await prisma.room.create({
      data: {
        slug: data.name,
        adminId: userId,
      },
    });
    if (!newRoom) {
      res.status(500).json({
        message: "Internal server error!",
      });
      return;
    }

    res.status(201).json({
      message: "Room created.",
      roomId: newRoom.id,
    });
  },
);

roomRouter.get(
  "/chats/:roomId",
  authMidlleware,
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO : input validation
    // @ts-ignore
    const userId = req.userId;
    const roomId = req.params.roomId as string;

    if (!roomId) {
      return next(apiError(409, "room field is required in params"));
    }

    const messages = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
      select: {
        id: true,
        user: {
          select: {
            username: true,
          },
        },
        message: true,
      },
      orderBy: {
        id: "desc",
      },
      take: 500,
    });

    res.status(200).json({
      message: "Chat fetched.",
      chats: messages.map((chat) => ({
        id: chat.id,
        username: chat.user.username,
        message: chat.message,
      })),
    });
  },
);

roomRouter.get(
  "/",
  authMidlleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const adminId = req.userId;

    const rooms = await prisma.room.findMany({
      where: {
        adminId,
      },
    });

    res.status(200).json({
      message: "Room fetched",
      rooms,
    });
  },
);
export { roomRouter };
