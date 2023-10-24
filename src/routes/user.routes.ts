import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { mongoIdValidator } from "../middlewares/validators/userValidators";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router().use(authMiddleware);


// OBTENER TODOS
router.get("/", userController.index);
// CREAR
router.post("/", userController.create);
// OBTENER UNO
router.get("/:id", 
    ...mongoIdValidator, 
    handleValidationErrors, 
    userController.show);
// BORRAR
router.delete("/:id", 
    ...mongoIdValidator, 
    handleValidationErrors, 
    userController.destroy);


export default router;