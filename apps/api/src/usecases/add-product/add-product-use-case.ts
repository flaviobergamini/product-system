import { ProductRepository } from "../interfaces/repositories/product-repository";
import { Product } from "src/entities/product";
import { randomUUID } from "crypto";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AddProductUseCase {
    constructor(
      @Inject('ProductRepository') private readonly productRepository: ProductRepository,
    ) {}

    async execute(name: string, category: string, quantity: number, price: number, description: string): Promise<Product> {
    const product = new Product(randomUUID(), name, category, quantity, price, description);
    return await this.productRepository.create(product);
  }
}