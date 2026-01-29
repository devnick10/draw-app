import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./config";
import { connectDb } from "./config/db";
import { userRouter } from "./router/user.router";
config({ path: "./.env" });
const app = express();

// Middlewares
app.use(cors);
app.use(express.json());

// Routes
app.use("/users", userRouter);

async function main() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
  });
}
main();
