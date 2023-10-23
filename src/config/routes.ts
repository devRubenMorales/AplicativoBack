import { Application } from "express";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import productRoutes from "../routes/product.routes";
import logger from "../utils/logger";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use('/product', productRoutes);
  logger.info("🟢 Routes registered");
};
