import type { Product } from "../entities/product";
import type { ProductRequestModel } from "../usecases/add-product/interfaces/product-request-model";
import type { ListProductsRequestModel } from "../usecases/list-products/interface/list-products-request-model";

export interface ProductService {
  list(params: ListProductsRequestModel): Promise<{ data: Product[]; total: number }>;
  create(data: ProductRequestModel): Promise<void>;
}
