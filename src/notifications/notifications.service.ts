import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { NotificationStatus } from './enum/NotificationStatus.enum';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly gateway: NotificationsGateway,
  ) {}

  
  async create(createNotificationDto: CreateNotificationDto) {
    const notification = new this.notificationModel({
      ...createNotificationDto,
      status: NotificationStatus.SENT,
      statusTimestamps: {
        sentAt: new Date(),
      },
    });

   const saved = await notification.save();
   this.gateway.emitToUser(saved.userId,'notification.new',saved);
   return saved;
  }

  
  async findByUser(
    userId: number,
    status?: NotificationStatus,
  ): Promise<Notification[]> {
    const query: any = { userId };
    if (status) {
      query.status = status;
    }

    return this.notificationModel
      .find(query)
      .sort({ createdAt: -1 })
      .exec();
  }

  
  async markAsDelivered(id: string): Promise<Notification> {
    const updated = await this.notificationModel.findByIdAndUpdate(
      id,
      {
        status: NotificationStatus.DELIVERED,
        'statusTimestamps.deliveredAt': new Date(),
      },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Notification not found');
    }

    return updated;
  }

  
  async markAsRead(id: string): Promise<Notification> {
    const updated = await this.notificationModel.findByIdAndUpdate(
      id,
      {
        status: NotificationStatus.READ,
        'statusTimestamps.readAt': new Date(),
      },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Notification not found');
    }
    this.gateway.emitToUser(updated.userId, 'notification.read', updated);
    console.log('sent emit');

    return updated;
  }

  
  async deleteAllForUser(userId: number): Promise<{ deletedCount: number }> {
    const res = await this.notificationModel.deleteMany({ userId });
    return { deletedCount: res.deletedCount };
  }
}
