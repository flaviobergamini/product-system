import { Product } from "src/entities/product";

export interface ProductRepository {
    create(product: Partial<Product>): Promise<Product>;
    findAll(): Promise<Product[]>
    findById(id: string): Promise<Product | null>;
}
