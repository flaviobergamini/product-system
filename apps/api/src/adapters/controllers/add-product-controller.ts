import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AddProductDto } from 'src/dtos/add-product-dto';
import { AddProductUseCase } from 'src/usecases/add-product/add-product-use-case';

@Controller('products/add')
export class AddProductController {
  constructor(private readonly createProduct: AddProductUseCase) {}

  @Post()
  async create(@Body() dto: AddProductDto) {
    try {
      const response = this.createProduct.execute(
        dto.name,
        dto.category,
        dto.quantity,
        dto.price,
        dto.description,
      );

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao cadastrar produto ${error}`,
        },

        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
