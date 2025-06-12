import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Product } from 'src/entities/product';
import { SocketService } from 'src/usecases/interfaces/services/socket-service';

@WebSocketGateway({ cors: true })
export class WebSocketService implements SocketService {
  @WebSocketServer()
  server: Server;

  broadcastNewProduct(product: Product) {
    this.server.emit('new-product', product);
  }
}
