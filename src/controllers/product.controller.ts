import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import IProduct from "../interfaces/product.interface";
import { NotFoundException } from "../utils/http.exception";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const { nombre, descripcion, precio, imageUrl } = req.body;
  
      const product: IProduct = new Product({
        nombre,
        descripcion,
        precio,
        imageUrl,
      });
      await product.save();
  
      return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).orFail(
      new NotFoundException("Product not found")
    );
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).orFail(
      new NotFoundException("Product not found")
    );
    await product.deleteOne();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};