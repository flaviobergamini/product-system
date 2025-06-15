import { ProductRepository } from '../interfaces/repositories/product-repository';
import { Product } from 'src/entities/product';
import { randomUUID } from 'crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from '../interfaces/services/cache-service';
import { SocketService } from '../interfaces/services/socket-service';

@Injectable()
export class AddProductUseCase {
  private readonly logger = new Logger(AddProductUseCase.name);

  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('CacheService') private readonly cache: CacheService,
    @Inject('SocketService') private readonly webSocket: SocketService,
  ) {}

  async execute(
    name: string,
    category: string,
    quantity: number,
    price: number,
    description: string,
  ): Promise<Product> {
    try {
      this.logger.log('Iniciando criação de produto');

      const product = new Product(
        randomUUID(),
        name,
        category.trim().toLowerCase(),
        quantity,
        price,
        description,
      );

      const productDb = await this.productRepository.create(product);

      this.logger.log(`Produto criado com ID: ${productDb.id}`);
      this.logger.log('Atualizando cache do Redis');

      const products = await this.productRepository.findAll();
      await this.cache.set('products', products);

      this.logger.log('Notificando adição de novo produto por WebSocket');

      this.webSocket.broadcastNewProduct(product);

      this.logger.log('Produto adicionado com sucesso');

      return productDb;
    } catch (error) {
      this.logger.error('Erro ao criar produto', error);
      throw error;
    }
  }
}
