import { Body, Controller, Post } from "@nestjs/common";
import { AddProductDto } from "src/dtos/add-product-dto";
import { AddProductUseCase } from "src/usecases/add-product/add-product-use-case";

@Controller('products/add')
export class AddProductController {
  constructor(private readonly createProduct: AddProductUseCase) {}

  @Post()
  async create(@Body() dto: AddProductDto) {
    return this.createProduct.execute(dto.name, dto.category, dto.quantity, dto.price, dto.description);
  }
}