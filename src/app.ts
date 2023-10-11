import express from "express";
import * as middlewares from "./config/middleware";
import * as database from "./config/database";
import * as routes from "./config/routes";
import errorHandler from "./middlewares/error.handler";

// inicialization
const app = express();

// Connect to the database
database.configure();

// Middlewares
middlewares.configure(app);

// Settings
app.set("port", process.env.PORT || 8080);

// Routes
routes.register(app);

// Error Handler
app.use(errorHandler);

export default app;