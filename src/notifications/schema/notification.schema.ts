import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationStatus } from '../enum/NotificationStatus.enum';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Object })
  data: Record<string, any>;

  @Prop({ enum: NotificationStatus, default: NotificationStatus.SENT })
  status: NotificationStatus;

  @Prop({
    type: {
      sentAt: Date,
      deliveredAt: Date,
      readAt: Date,
    },
    default: {},
  })
  statusTimestamps: {
    sentAt?: Date;
    deliveredAt?: Date;
    readAt?: Date;
  };
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
