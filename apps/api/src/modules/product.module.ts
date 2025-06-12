import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddProductController } from 'src/adapters/controllers/add-product-controller';
import { MongoProductRepository } from 'src/external/orm/repositories/mongo-product-repository';
import { ProductSchema } from 'src/external/orm/schemas/product-schema';
import { AddProductUseCase } from 'src/usecases/add-product/add-product-use-case';
import { CacheService } from 'src/usecases/interfaces/services/cache-service';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    forwardRef(() => RedisModule),
  ],
  controllers: [AddProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MongoProductRepository,
    },
    {
      provide: AddProductUseCase,
      useFactory: (repo: MongoProductRepository, cache: CacheService) =>
        new AddProductUseCase(repo, cache),
      inject: ['ProductRepository', 'CacheService'],
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
