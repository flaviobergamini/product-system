import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddProductController } from 'src/adapters/controllers/add-product-controller';
import { MongoProductRepository } from 'src/external/orm/repositories/mongo-product-repository';
import { ProductSchema } from 'src/external/orm/schemas/product-schema';
import { AddProductUseCase } from 'src/usecases/add-product/add-product-use-case';
import { CacheService } from 'src/usecases/interfaces/services/cache-service';
import { RedisModule } from './redis.module';
import { SocketService } from 'src/usecases/interfaces/services/socket-service';
import { WebSocketModule } from './web-socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    forwardRef(() => RedisModule),
    WebSocketModule,
  ],
  controllers: [AddProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MongoProductRepository,
    },
    {
      provide: AddProductUseCase,
      useFactory: (
        repo: MongoProductRepository,
        cache: CacheService,
        socket: SocketService,
      ) => new AddProductUseCase(repo, cache, socket),
      inject: ['ProductRepository', 'CacheService', 'SocketService'],
    },
  ],
  exports: [
    MongooseModule,
    {
      provide: 'ProductRepository',
      useClass: MongoProductRepository,
    },
  ],
})
export class ProductModule {}
