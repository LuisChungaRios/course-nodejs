// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum DocumentType {
  DNI = 'DNI',
  PASAPORTE = 'PASAPORTE',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, type: Date })
  born_date: Date;

  @Prop({ required: true, enum: DocumentType })
  document_type: DocumentType;

  @Prop({ required: true, unique: true })
  document_number: string;

  @Prop({ default: true })
  is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
