import { model, Schema } from "mongoose";
import IProduct from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>(
    {
        nombre: {
          type: String,
          required: [true, "El nombre es obligatorio"],
        },
        descripcion: {
          type: String,
        },
        precio: {
          type: Number,
          required: [true, "La contraseña es obligatoria"],
          min: 0
        },
        imageUrl: {
          type: String
        }
      },
      {
        timestamps: { createdAt: true, updatedAt: true },
      }
)

export default model<IProduct>("Product", productSchema);