import { forwardRef, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisCacheService } from 'src/external/services/redis-cache-service';
import { config } from 'src/config';
import { ListProductController } from 'src/adapters/controllers/list-products-controller';
import { ListProductsUseCase } from 'src/usecases/list-products/list-products-usecase';
import { MongoProductRepository } from 'src/external/orm/repositories/mongo-product-repository';
import { ProductModule } from './product.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        socket: {
          host: config.REDIS.HOST,
          port: config.REDIS.PORT,
        },
        username: config.REDIS.USER_NAME,
        password: config.REDIS.PASSWORD,
        ttl: 60,
      }),
    }),
    forwardRef(() => ProductModule),
  ],
  controllers: [ListProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MongoProductRepository,
    },
    {
      provide: 'CacheService',
      useClass: RedisCacheService,
    },
    {
      provide: ListProductsUseCase,
      useClass: ListProductsUseCase,
    },
  ],
  exports: [
    {
      provide: 'CacheService',
      useClass: RedisCacheService,
    },
  ],
})
export class RedisModule {}
