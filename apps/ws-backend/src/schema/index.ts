import z from "zod";

const RectSchema = z.object({
  type: z.literal("rect"),
  width: z.number(),
  height: z.number(),
  x: z.number(),
  y: z.number(),
});

const CircleSchema = z.object({
  type: z.literal("circle"),
  centerX: z.number(),
  centerY: z.number(),
  radius: z.number(),
});

const PencilSchema = z.object({
  type: z.literal("pencil"),
  startX: z.number(),
  startY: z.number(),
  endX: z.number(),
  endY: z.number(),
});

const JoinRoomSchema = z.object({
  type: z.literal("join_room"),
  roomId: z.string(),
});

const LeaveRoomSchema = z.object({
  type: z.literal("leave_room"),
  roomId: z.string(),
});

const ShapeSchema = z.discriminatedUnion("type", [
  RectSchema,
  CircleSchema,
  PencilSchema,
]);

const ShapeMessageSchema = z.object({
  type: z.literal("shape"),
  roomId: z.string(),
  shape: ShapeSchema,
});

export const MessageSchema = z.discriminatedUnion("type", [
  JoinRoomSchema,
  LeaveRoomSchema,
  ShapeMessageSchema,
]);
