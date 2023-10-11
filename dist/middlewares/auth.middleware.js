"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            return next(res.status(401).json("Missing authorization header."));
        req.token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(req.token, process.env.JWT_SECRET || "");
        if (!decoded)
            return next(res.status(401).json("Unauthorized."));
        const userFound = yield user_model_1.default.findById(decoded.sub);
        if (!userFound)
            return res.status(401).json("Unauthorized");
        req.user = userFound;
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.authMiddleware = authMiddleware;
