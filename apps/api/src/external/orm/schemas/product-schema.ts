import { Schema } from "mongoose";

export const ProductSchema = new Schema ({
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});
