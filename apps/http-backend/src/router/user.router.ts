import { JWT_SECRET } from "@repo/backend-common/config";
import { SigninSchema, SignupSchema } from "@repo/common/schema";
import { prisma } from "@repo/db";
import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { authMidlleware } from "../middlewares/authMiddleware";
import apiError from "http-errors";

const userRouter: Router = Router();

userRouter.post("/signin", async (req: Request, res: Response, next: NextFunction) => {
  const { data, success } = SigninSchema.safeParse(req.body);
  if (!success) {
    return next(apiError(411, "Invalid inputs"));
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return next(apiError(400, "Invalid credentials"));
  }

  const isPasswordValid = compare(data?.password, user.password);
  if (!isPasswordValid) {
    return next(apiError(400, "Invalid credentials"));
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1hr" });

  res.status(200).json({
    message: "Signin sucessfully",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username
    }
  });
});

userRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  const { data, success } = SignupSchema.safeParse(req.body);
  if (!success) {
    return next(apiError(400, "Invalid inputs"));
  }

  const userExist = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (userExist) {
    return next(apiError(400, "Email is taken!"));
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
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }
  });
});

userRouter.get("/me", authMidlleware, async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userId = req.userId;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return next(apiError(400, "Unauthorized"));
  }
  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      emal: user.email,
    }
  });
});

export { userRouter };
