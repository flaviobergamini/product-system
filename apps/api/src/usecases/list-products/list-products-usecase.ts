import { Injectable, Inject, Logger } from '@nestjs/common';
import { ProductRepository } from '../interfaces/repositories/product-repository';
import { CacheService } from '../interfaces/services/cache-service';
import { Product } from 'src/entities/product';

@Injectable()
export class ListProductsUseCase {
  private readonly logger = new Logger(ListProductsUseCase.name);

  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
    @Inject('CacheService') private cache: CacheService,
  ) {}

  async execute(params: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<{ data: Product[]; total: number }> {
    try {
      const { page, limit, category } = params;

      this.logger.log('Buscando produtos na cache do Redis');
      const cached = await this.cache.get<Product[]>('products');

      if (cached) {
        this.logger.log('Retornando produtos vindos do Redis');

        const filtered = category
          ? cached.filter((p) => p.category === category)
          : cached;

        let paginated: Product[];

        if (page !== undefined && limit !== undefined) {
          const start = (page - 1) * limit;
          const end = start + limit;
          paginated = [...filtered.slice(start, end)];
        } else {
          paginated = [...filtered];
        }

        const total = paginated.length;

        return { data: paginated, total };
      } else {
        const productsToCache = this.productRepository.findAll();
        await this.cache.set('products', productsToCache);
      }

      this.logger.log(
        'Buscando produtos no banco de dados e atualizando cache',
      );

      const products = await this.productRepository.listPaginated(
        page,
        limit,
        category,
      );

      return products;
    } catch (error) {
      this.logger.error('Erro ao criar produto', error);
      throw error;
    }
  }
}
