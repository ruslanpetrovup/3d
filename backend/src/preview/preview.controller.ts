import { Controller, Post, Get, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PreviewService } from './preview.service';
import { LatestPhoto } from './interfaces/preview.interface';

@Controller('preview')
export class PreviewController {
  constructor(private readonly previewService: PreviewService) {}

  @Post('generate-preview')
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.previewService.create(file);
  }

  @Get('temp-photos/:id')
  async serveFile(@Param('id') id: string) {
    return this.previewService.getTempPhoto(+id)
  }

  @Get('latest')
  async getLatestPhotos(@Query('limit') limit?: number): Promise<LatestPhoto[]> {
    return this.previewService.getLatestPhotos(limit);
  }
}
