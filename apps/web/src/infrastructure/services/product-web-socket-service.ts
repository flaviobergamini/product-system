import { io, type Socket } from "socket.io-client";
import type { Product } from "../../domain/entities/product";
import type { SocketService } from "../../domain/interfaces/socket-service";

export class ProductWebSocketService implements SocketService{
    private readonly socket: Socket;

    constructor () {
        this.socket = io(import.meta.env.VITE_API_URL);
    }

    onNewProduct(callback: (product: Product) => void) {
        this.socket.on("new-product", callback);
    }

    disconnect() {
        this.socket.disconnect();
    }
}
