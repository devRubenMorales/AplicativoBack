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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_exception_1 = require("../utils/http.exception");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, contraseña, rol } = req.body;
        if (yield user_model_1.default.findOne({ email })) {
            throw new http_exception_1.HttpException(400, 'The user is already registered');
        }
        let user = new user_model_1.default({
            nombre,
            email,
            contraseña,
            rol,
        });
        if ((yield user.guardarContraseña()) === false) {
            throw new http_exception_1.BadRequestException("Password encryption failed");
        }
        yield user.save();
        // Devolver datos
        const userData = yield user_model_1.default.findById(user._id).orFail(new http_exception_1.NotFoundException("User Data not found"));
        return res.json(userData);
    }
    catch (err) {
        return next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email })
            .select("+contraseña")
            .orFail(new http_exception_1.NotFoundException("User not found"));
        if (!user.contraseña)
            throw new http_exception_1.HttpException(401, "Unauthorized, missing password");
        const correctPassword = yield user.validarContraseña(req.body.contraseña);
        if (!correctPassword)
            throw new http_exception_1.HttpException(401, "Invalid Password");
        // Create a Token
        const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const _a = user.toJSON(), { contraseña } = _a, data = __rest(_a, ["contrase\u00F1a"]);
        return res.header("auth-token", token).json(Object.assign(Object.assign({}, data), { token }));
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
