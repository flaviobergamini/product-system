import type { ProductService } from "../../interfaces/product-service";
import type { ListProductsRequestModel } from "./interface/list-products-request-model";

export class ListProductsUseCase {
  constructor(private readonly gateway: ProductService) {}

  async execute(params: ListProductsRequestModel) {
    params.limit = 10
    return await this.gateway.list(params);
  }
}
