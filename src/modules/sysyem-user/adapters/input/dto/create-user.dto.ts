import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SystemUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  organization_name;

  @IsNotEmpty()
  @IsNumber()
  active;

  @IsNumber()
  role_id: number;

  @IsNumber()
  department_id: number;

  @IsNumber()
  municipality_id: number;
}
