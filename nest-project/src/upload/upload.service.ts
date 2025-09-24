import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { writeFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { Image, ImageDocument } from '../database/schemas/image.schema';

@Injectable()
export class UploadService {

  private s3: S3Client;

  constructor(

    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,

  ){
    this.s3 = new S3Client({ region: process.env.AWS_REGION , credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    }});
  }
 async uploadLocal(file: Express.Multer.File) {
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    const filePath = join(uploadPath, file.originalname);
    console.log('File path:', filePath);
    writeFileSync(filePath, file.buffer);
    const url = `${process.env.APP_URL}/${uploadPath}/${file.originalname}`;

    const image = new this.imageModel({ filename: file.originalname, url, storageType: 'local' });
    await image.save();

    return { message: 'Archivo guardado en el servidor', url };
  }

async uploadS3(file: Express.Multer.File) {
    const bucketName = process.env.AWS_S3_BUCKET;
    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    } ;

    const data = await this.s3.send(new PutObjectCommand(params))

    console.log('S3 upload data:', data);

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    const image = new this.imageModel({ filename: file.originalname, url: url, storageType: 's3' });
    await image.save();

    return { message: 'Archivo subido a S3', url };
  }

  async listImages() {
    console.log('Listing images...');
    return this.imageModel.find().sort({ createdAt: -1 }).exec();
  }
}
