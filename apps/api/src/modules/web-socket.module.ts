import { Module } from '@nestjs/common';
import { WebSocketService } from 'src/external/services/web-socket-service';

@Module({
  providers: [
    {
      provide: 'SocketService',
      useClass: WebSocketService,
    },
    WebSocketService,
  ],
  exports: ['SocketService'],
})
export class WebSocketModule {}
