import { Document } from 'mongoose';

export type ProductDocument = Document & {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
};