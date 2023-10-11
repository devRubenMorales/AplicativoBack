import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { authLoginValidators , authSingupValidators } from "../middlewares/validators/userValidators";

const router = Router();

// REGISTRAR
router.post(
    "/signup",
    ...authSingupValidators,
    handleValidationErrors,
    authController.signup
);

// INICIAR SESION
router.post(
    "/login",
    ...authLoginValidators,
    handleValidationErrors,
    authController.login
);

export default router;