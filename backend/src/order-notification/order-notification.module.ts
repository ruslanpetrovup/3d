import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderNotificationService } from './order-notification.service';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  providers: [OrderNotificationService],
  exports: [OrderNotificationService],
})
export class OrderNotificationModule {}