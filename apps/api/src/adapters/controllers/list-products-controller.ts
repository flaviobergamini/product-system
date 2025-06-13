import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ListProductsUseCase } from 'src/usecases/list-products/list-products-usecase';

@Controller('products/list')
export class ListProductController {
  constructor(private readonly listProduct: ListProductsUseCase) {}

  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    try {
      const response = this.listProduct.execute({
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
        category,
      });

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao listar produtos ${error}`,
        },

        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
