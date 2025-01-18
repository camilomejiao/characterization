import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class SystemUserDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  role_id: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  department_id: number;

  @ApiProperty({ example: 55 })
  @IsNumber()
  municipality_id: number;
}
