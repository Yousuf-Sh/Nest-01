import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors:{origin:'*'}
})
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer()
  server:Server;

  afterInit() {
    console.log('Notificaiton Gatewat Initialized');
  }

  emitToUser(userId:number,event:string,payload:any){
    this.server.to(`user_${userId}`).emit(event,payload)
  }

  handleConnection(socket:any){
    const userId= socket.handshake.query.userId;
    if(userId){
      socket.join(`user_${userId}`);
    }
  }
}
