import { Controller, Get } from "@nestjs/common";
import { ListProductsUseCase } from "src/usecases/list-products/list-products-usecase";

@Controller('products/list')
export class ListProductController {
  constructor(private readonly listProduct: ListProductsUseCase) {}

  @Get()
  async list() {
    return this.listProduct.execute();
  }
}
