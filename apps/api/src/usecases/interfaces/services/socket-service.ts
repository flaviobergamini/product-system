import { Product } from 'src/entities/product';

export interface SocketService {
  broadcastNewProduct(product: Product);
}
