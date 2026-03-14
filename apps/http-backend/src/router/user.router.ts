import { JWT_SECRET } from "@repo/backend-common/config";
import { SigninSchema, SignupSchema } from "@repo/common/schema";
import { prisma } from "@repo/db";
import { compare, hash } from "bcrypt";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { authMidlleware } from "../middlewares/authMiddleware";

const userRouter: Router = Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { data, success } = SigninSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
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
    res.status(411).json({
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
    res.status(411).json({
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
    res.status(400).json({
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

userRouter.get("/me", authMidlleware, async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  res.status(200).json({
    username: user?.username,
    emal: user?.email,
  });
});

export { userRouter };
