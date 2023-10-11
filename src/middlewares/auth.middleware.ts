import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction  
) => {
  try {
    if (!req.headers.authorization)
      return next(res.status(401).json("Missing authorization header."));

    req.token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || "") as any;
    if (!decoded) return next(res.status(401).json("Unauthorized."));

    const userFound = await User.findById(decoded.sub);
    if (!userFound) return res.status(401).json("Unauthorized");

    req.user = userFound;
    next();
  } catch (error) {
    return next(error);
  }
};