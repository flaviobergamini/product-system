import { Product } from 'src/entities/product';

export interface ProductRepository {
  create(product: Partial<Product>): Promise<Product>;
  listPaginated(
    page?: number,
    limit?: number,
    category?: string,
  ): Promise<{ data: Product[]; total: number }>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
