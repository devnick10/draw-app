import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { PORT } from "./config/index.js";
import { connectDb } from "./config/db.js";
import { userRouter } from "./router/user.router.js";
import { healthCheckRouter } from "./router/health-check.route.js";
import morgan from "morgan"
import { errorHandler } from "./errorHandler.js";
const app = express();

/**
 * Improments 
 * 1. Global catch for controller 
 * 2. make controller dir and seprate it from routes 
 * 3. config management 
 */


// Middlewares
app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(morgan("dev"))
// Routes
app.use("/users", userRouter);

// health-check
app.use("/health-check", healthCheckRouter)

// Global Error Handler 
app.use(errorHandler)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
  });
})
