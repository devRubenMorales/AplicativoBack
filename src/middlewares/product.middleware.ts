import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/http.exception";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.rol !== 'admin') {
        throw new UnauthorizedException("El usuario no tiene permisos de administrador");
    }
    next();
  } catch (error) {
    return next(error);
  }
};
