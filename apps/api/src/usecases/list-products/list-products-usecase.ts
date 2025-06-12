import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../interfaces/repositories/product-repository';
import { CacheService } from '../interfaces/services/cache-service';
import { Product } from 'src/entities/product';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('ProductRepository') private repo: ProductRepository,
    @Inject('CacheService') private cache: CacheService,
  ) {}

  async execute(): Promise<Product[]> {
    const cached = await this.cache.get<Product[]>('products');

    if (cached) return cached;

    const products = await this.repo.findAll();

    await this.cache.set('products', products);

    return products;
  }
}
