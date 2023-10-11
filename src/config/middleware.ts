import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import errorHandler from "../middlewares/error.handler";
import logger from "../utils/logger";

export const configure = async (app: Application) => {
  dotenv.config();
  app.use(
    morgan("dev", {
      stream: {
        write: (message: string) => {
          logger.info(message.trim()); // Esto registrará cada solicitud HTTP en tu logger.
        },
      },
    })
  );
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  logger.info("🟢 Middlewares configurated");
};