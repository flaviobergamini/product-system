import type { ProductHttpService } from "../../../infrastructure/services/product-http-service";
import type { ProductRequestModel } from "./interfaces/product-request-model";

export class AddProductUseCase {
  constructor(private productService: ProductHttpService) {}

  async execute(data: ProductRequestModel) {
    return await this.productService.create(data);
  }
}
