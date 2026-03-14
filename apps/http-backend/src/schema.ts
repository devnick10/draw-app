import z from "zod";

export const GetShapeByRoomIdSchema = z.object({
  roomId: z.string(),
});

export const DeleteRoomSchema = z.object({
  roomId: z.string(),
});
