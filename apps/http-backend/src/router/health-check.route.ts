import { Request, Response, Router } from "express";

const healthCheckRouter: Router = Router();

healthCheckRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "server is healthy" });
});

export { healthCheckRouter };
