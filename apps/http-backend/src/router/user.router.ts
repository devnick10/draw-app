import { Request, Response, Router } from "express";
import { authMidlleware } from "../middleware.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { RoomSchema, SigninSchema, SignupSchema } from "@repo/common/schema";
import { compare, hash } from "bcrypt";
import { prisma } from "@repo/db";

const userRouter: Router = Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { data, success } = SigninSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: "Invalid inputs",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  const isPasswordValid = compare(data?.password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1hr" });
  res.status(200).json({
    message: "Signin sucessfully",
    token,
  });
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { data, success } = SignupSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: "Invalid inputs",
    });
    return;
  }

  const userExist = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (userExist) {
    res.status(409).json({
      message: "Email is taken!",
    });
    return;
  }

  const hashedPassword = await hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
    expiresIn: "1hr",
  });
  res.status(201).json({
    message: "Signup sucessfully",
    token,
  });
});


export { userRouter };
