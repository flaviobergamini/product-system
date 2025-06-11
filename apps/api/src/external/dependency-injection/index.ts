import { MongoProductRepository } from "src/external/orm/repositories/mongo-product-repository";
import { container } from "tsyringe";

export const containerV1 = container.createChildContainer();

// useCases

// Services

// Validators

// Repositories
containerV1.register('ProductRepository', {
  useClass: MongoProductRepository,
});

// Consumers
