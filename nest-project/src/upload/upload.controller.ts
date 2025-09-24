import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('local')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLocal(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadLocal(file);
  }

  @Post('s3')
  @UseInterceptors(FileInterceptor('file'))
  async uploadS3(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3(file);
  }

  @Get('images')
  async getImages() {
    return this.uploadService.listImages();
  }
}
