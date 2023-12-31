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
exports.register = void 0;
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const logger_1 = __importDefault(require("../utils/logger"));
const register = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use("/users", user_routes_1.default);
    app.use("/auth", auth_routes_1.default);
    logger_1.default.info("🟢 Routes registered");
});
exports.register = register;
