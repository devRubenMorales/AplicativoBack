import { Application } from "express";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import logger from "../utils/logger";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  logger.info("🟢 Routes registered");
};
