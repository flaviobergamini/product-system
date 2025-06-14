import axios from 'axios';
import { Product } from '../../domain/entities/product';
import type { ListProductsRequestModel } from '../../domain/usecases/list-products/interface/list-products-request-model';
import type { ProductRequestModel } from '../../domain/usecases/add-product/interfaces/product-request-model';
import type { ProductService } from '../../domain/interfaces/product-service';

export class ProductHttpService implements ProductService {
  private readonly baseUrl = import.meta.env.VITE_API_URL;

  async list(params: ListProductsRequestModel): Promise<{ data: Product[]; total: number }> {
    const res = await axios.get(`${this.baseUrl}/api/products/list`, { params });
    const body = res.data;

    return {
      data: body.data.map(
        (p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.description),
      ),
      total: body.total,
    };
  }

  async create(data: ProductRequestModel): Promise<void> {
    await axios.post(`${this.baseUrl}/api/products/add`, data);
  }
}
