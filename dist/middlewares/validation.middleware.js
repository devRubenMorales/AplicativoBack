"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const http_exception_1 = require("../utils/http.exception");
const logger_1 = __importDefault(require("../utils/logger"));
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(err => err.msg).join(', ');
        logger_1.default.error(`Validation Error: ${errorMessage}`);
        throw new http_exception_1.BadRequestException(errorMessage);
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
