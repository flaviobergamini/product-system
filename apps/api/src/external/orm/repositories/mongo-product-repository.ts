import { ProductRepository } from 'src/usecases/interfaces/repositories/product-repository';
import { Product } from 'src/entities/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/models/product-model';

export class MongoProductRepository implements ProductRepository {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const created = await this.productModel.create(product);
    return new Product(
      created._id,
      created.name,
      created.category,
      created.quantity,
      created.price,
      created.description,
    );
  }

  async listPaginated(
    page: number = 1,
    limit: number = 10,
    category?: string,
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const filter = category ? { category } : {};

    const [docs, total] = await Promise.all([
      this.productModel.find(filter).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(filter),
    ]);

    const data = docs.map(
      (d) =>
        new Product(
          d._id,
          d.name,
          d.category,
          d.quantity,
          d.price,
          d.description,
        ),
    );

    return { data, total };
  }

  async findAll(): Promise<Product[]> {
    const docs = await this.productModel.find();
    return docs.map(
      (d) =>
        new Product(
          d._id,
          d.name,
          d.category,
          d.quantity,
          d.price,
          d.description,
        ),
    );
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this.productModel.findById(id);
    return doc
      ? new Product(
          doc._id,
          doc.name,
          doc.category,
          doc.quantity,
          doc.price,
          doc.description,
        )
      : null;
  }
}
