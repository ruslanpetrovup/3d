import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreviewService } from './preview.service';
import { PreviewController } from './preview.controller';
import { TempGeneratePhoto } from './entities/temp-generate-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TempGeneratePhoto])],
  controllers: [PreviewController],
  providers: [PreviewService],
})
export class PreviewModule {}
