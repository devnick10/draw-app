import z from "zod";

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(20),
});

export const SignupSchema = z.object({
  username: z.string().min(4).max(20),
  email: z.email(),
  password: z.string().min(4).max(20),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(4).max(20),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
export type SignUpSchemaType = z.infer<typeof SignupSchema>;
export type CreateRoomSchemaType = z.infer<typeof CreateRoomSchema>;
