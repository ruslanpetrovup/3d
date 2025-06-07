import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreviewService } from './preview.service';
import { PreviewController } from './preview.controller';
import { TempGeneratePhoto } from './entities/temp-generate-photo.entity';
import { OrderNotificationModule } from '../order-notification/order-notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([TempGeneratePhoto]), OrderNotificationModule],
  controllers: [PreviewController],
  providers: [PreviewService],
})
export class PreviewModule {}
