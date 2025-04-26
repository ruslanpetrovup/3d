import { Controller, Post, Get, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PreviewService } from './preview.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('preview')
export class PreviewController {
  constructor(private readonly previewService: PreviewService) {}

  @Post('generate-preview')
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.previewService.create(file);
  }

  @Get('temp-photos/:filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(path.join(process.cwd(), 'uploads/temp-photos', filename));
  }
}
