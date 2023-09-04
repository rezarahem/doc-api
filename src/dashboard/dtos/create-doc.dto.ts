import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
