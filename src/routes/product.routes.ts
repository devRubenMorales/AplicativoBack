import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { mongoIdValidator, productsValidators } from "../middlewares/validators/productValidators";
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { adminMiddleware } from "../middlewares/product.middleware";

const router = Router();

// OBTENER TODOS
router.get(
    "/", 
    productController.index
);
// CREAR
router.post(
    "/", 
    ...productsValidators,
    handleValidationErrors,
    authMiddleware, 
    adminMiddleware,
    productController.create
);
// OBTENER UNO
router.get("/:id", ...mongoIdValidator, 
    handleValidationErrors, 
    productController.show
);
// BORRAR
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    productController.destroy
);

export default router;