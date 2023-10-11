"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdValidator = exports.authSingupValidators = exports.authLoginValidators = void 0;
const express_validator_1 = require("express-validator");
exports.authLoginValidators = [
    (0, express_validator_1.check)("email").isEmail().withMessage("El email no es válido"),
    (0, express_validator_1.check)("contraseña")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
exports.authSingupValidators = [
    (0, express_validator_1.check)("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    (0, express_validator_1.check)("email").isEmail().withMessage("El email no es válido"),
    (0, express_validator_1.check)("contraseña")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    (0, express_validator_1.check)("rol")
        .isIn(["admin", "usuario"])
        .withMessage("El rol debe ser 'admin' o 'usuario'"),
];
exports.mongoIdValidator = (0, express_validator_1.check)("id")
    .isMongoId()
    .withMessage("El ID proporcionado no es válido para MongoDB.");
