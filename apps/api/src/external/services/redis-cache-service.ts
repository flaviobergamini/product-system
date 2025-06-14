import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/usecases/interfaces/services/cache-service';

@Injectable()
export class RedisCacheService implements CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    return (await this.cache.get<T>(key)) ?? null;
  }

  async set<T>(key: string, value: T, ttl = 60): Promise<void> {
    await this.cache.set(key, value, ttl * 1000); // ttl em ms
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
