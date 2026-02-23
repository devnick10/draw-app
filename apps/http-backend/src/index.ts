import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { ACCESS_ORIGIN, PORT } from "./config/index.js";
import { connectDb } from "./config/db.js";
import { userRouter } from "./router/user.router.js";
import { healthCheckRouter } from "./router/health-check.route.js";
import morgan from "morgan";
import { errorHandler } from "./errorHandler.js";
import { roomRouter } from "./router/room.router.js";
import cookieParser from "cookie-parser";
const app = express();

// Middlewares
app.use(
  cors({
    origin: [`${ACCESS_ORIGIN}`],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Routes

app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

// health-check

app.use("/api/health-check", healthCheckRouter);

// Global Error Handler

app.use(errorHandler);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
  });
});
