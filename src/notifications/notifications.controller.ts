import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationStatus } from './enum/NotificationStatus.enum';
import { NotificationsGateway } from './notifications.gateway';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService,
     private readonly gateway: NotificationsGateway,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findByUser(
    @Query('usreId',ParseIntPipe) userId:number,
    @Query('status') status?: NotificationStatus
  ){
    return this.notificationsService.findByUser(userId,status);
  }

  @Patch(':id/delivered')
  markAsDelivered(@Param('id') id:string){
    return this.notificationsService.markAsDelivered(id);
  }
  @Patch(':id/read')
  markAsRead(@Param('id') id:string){
    return this.notificationsService.markAsRead(id);
  }

  @Delete()
  deleteAllForUser(
    @Query('userId',ParseIntPipe) userId:number
  ){
    return this.deleteAllForUser(userId);
  }

  // notifications.controller.ts
@Get('test-emit/:userId')
testEmit(@Param('userId') userId: number) {
  this.gateway.emitToUser(userId, 'notification.new', {
    title: 'Hello from server',
    message: 'This is a test notification!',
  });
  return { success: true };
}

}
