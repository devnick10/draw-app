import { CreateRoomSchema } from "@repo/common/schema";
import { prisma } from "@repo/db";
import { NextFunction, Request, Response, Router } from "express";
import { authMidlleware } from "../middlewares/authMiddleware.js";
import apiError from "http-errors";
import { DeleteRoomSchema, GetShapeByRoomIdSchema } from "../schema.js";

const roomRouter: Router = Router();

roomRouter.post("/", authMidlleware, async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userId = req.userId;
  const { data, success } = CreateRoomSchema.safeParse(req.body);
  if (!success) {
    return next(apiError(411, "Invalid inputs"));
  }

  try {
    const isRoomExist = await prisma.room.findFirst({
      where: {
        slug: data.name,
        adminId: userId,
      },
    });

    if (isRoomExist) {
      return next(apiError(400, "Room name already exist,"));
    }

    const newRoom = await prisma.room.create({
      data: {
        slug: data.name,
        adminId: userId,
      },
    });

    if (!newRoom) {
      return next(apiError(500, "Internal server error!"));
    }

    res.status(201).json({
      message: "Room created.",
      roomId: newRoom.id,
    });
  } catch (error) {
    console.log(error);
  }
});

roomRouter.get(
  "/shapes/:roomId",
  authMidlleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.userId;
    const { success, data } = GetShapeByRoomIdSchema.safeParse(req.params);
    if (!success) {
      return next(apiError(409, "Invalid inputs"));
    }

    const shapes = await prisma.shape.findMany({
      where: {
        userId,
        roomId: data.roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 500,
    });

    if (!shapes) {
      return next(apiError(404, "Room not found"));
    }
    res.status(200).json({
      message: "Shapes fetched.",
      shapes,
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

roomRouter.get(
  "/delete/:roomId",
  authMidlleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const adminId = req.userId;
    const { success, data } = DeleteRoomSchema.safeParse(req.params);
    if (!success) {
      return next(apiError(409, "Invalid inputs"));
    }

    const roomId = data.roomId;
    await prisma.room.delete({
      where: {
        adminId,
        id: roomId,
      },
    });

    res.status(200).json({
      message: "Room deleted",
    });
  },
);

roomRouter.get(
  "/search",
  authMidlleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const adminId = req.userId;
      const { q } = req.query;

      if (!q || typeof q !== "string") {
        return next(apiError(400, "Search query is required"));
      }

      const rooms = await prisma.room.findMany({
        where: {
          adminId,
          slug: {
            contains: q,
            mode: "insensitive",
          },
        },
        orderBy: {
          createAt: "desc",
        },
      });

      res.status(200).json({
        rooms,
      });
    } catch (err) {
      next(err);
    }
  },
);
export { roomRouter };
