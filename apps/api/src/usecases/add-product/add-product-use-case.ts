import { ProductRepository } from "../interfaces/repositories/product-repository";
import { Product } from "src/entities/product";
import { randomUUID } from "crypto";
import { Inject, Injectable } from "@nestjs/common";
import { CacheService } from "../interfaces/services/cache-service";

@Injectable()
export class AddProductUseCase {
    constructor(
      @Inject('ProductRepository') private readonly productRepository: ProductRepository,
      @Inject('CacheService') private cache: CacheService,
    ) {}

    async execute(name: string, category: string, quantity: number, price: number, description: string): Promise<Product> {
    const product = new Product(randomUUID(), name, category, quantity, price, description);
    const productDb = await this.productRepository.create(product);

    const products = await this.productRepository.findAll();
    await this.cache.set('products', products);

    return productDb;
  }
}