import type { Product } from "../entities/product";

export interface SocketService {
    onNewProduct(callback: (product: Product) => void): void;
    disconnect?(): void;
}
