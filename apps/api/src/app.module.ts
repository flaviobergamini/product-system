import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product.module';
import { config } from './config';
import { RedisModule } from './modules/redis.module';

@Module({
  imports: [MongooseModule.forRoot(config.DB.url), ProductModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
