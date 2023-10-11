import mongoose from "mongoose";
import logger from "../utils/logger";

export const configure = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/database-example");
    logger.info("🟢 Connected to the database");
  } catch (error) {
    logger.error("🔴 Error connecting to the database:", error);
  }
};