import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTOEntity {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}


export class SignInDTOEntity {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}