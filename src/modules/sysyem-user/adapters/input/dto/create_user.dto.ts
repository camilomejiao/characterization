import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class Create_userDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  organization_id;

  @IsNotEmpty()
  @IsNumber()
  active;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
