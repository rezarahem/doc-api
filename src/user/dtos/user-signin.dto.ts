import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
