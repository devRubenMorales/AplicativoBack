import { Document } from "mongoose";

interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  imageUrl: string
}

export default IProduct;