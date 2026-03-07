import z from "zod";

export const GetShapeByRoomIdSchema = z.object({
  roomId: z.string(),
});
