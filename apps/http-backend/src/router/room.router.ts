import { RoomSchema } from "@repo/common/schema";
import { prisma } from "@repo/db";
import { NextFunction, Request, Response, Router } from "express";
import { authMidlleware } from "../middleware.js";
import apiError from "http-errors";

const roomRouter: Router = Router();

roomRouter.post(
    "/room",
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
    "/chats",
    authMidlleware,
    async (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const userId = req.userId;
        const roomId = req.query.room as string;

        if (!roomId) {
            return next(apiError(409, "room field is required as query params"))
        }

        const room = await prisma.room.findUnique({
            where: {
                id: roomId,
                adminId: userId,
            },
            include: {
                chats: {
                    orderBy: {
                        //@ts-ignore
                        createdAt: "desc",
                    },
                    take: 50
                }
            }
        });

        if (!room) {
            return next(apiError(404, "Room not found."))
        }

        const chats = room.chats;
        res.status(201).json({
            message: "Chat fetched.",
            chats
        });
    },
);
export { roomRouter };