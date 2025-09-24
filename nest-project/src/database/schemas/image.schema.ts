import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop()
  filename: string;

  @Prop()
  url: string; // Local o S3

  @Prop()
  storageType: string; // "local" o "s3"
}

export const ImageSchema = SchemaFactory.createForClass(Image);
