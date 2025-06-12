import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification,NotificationSchema } from './schema/notification.schema';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Notification.name,schema:NotificationSchema}
  ])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
