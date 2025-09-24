import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DocumentType } from './../../database/schemas/user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;
  
  @IsNotEmpty()
  @IsDateString()
  born_date: string;

  @IsNotEmpty()
  @IsEnum(DocumentType)
  document_type: DocumentType;
  
  @IsNotEmpty() 
  @IsString()
  document_number: string;

  @IsBoolean() 
  is_active?: boolean;
}
