import type { ProductHttpService } from "../../../infrastructure/services/product-http-service";
import type { ProductRequestModel } from "./interfaces/product-request-model";

export class AddProductUseCase {
  constructor(private productService: ProductHttpService) {}

  async execute(data: ProductRequestModel) {
    if (data.category !== null || data.category !== undefined) {
      data.category = data.category.trim().toLowerCase();
    }
    
    return await this.productService.create(data);
  }
}
