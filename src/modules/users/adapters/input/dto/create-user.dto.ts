import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsNotEmpty()
  @IsString()
  first_last_name: string;

  @IsOptional()
  @IsString()
  middle_last_name?: string;

  @IsNotEmpty()
  @IsNumber()
  identification_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  identification_number: number;

  @IsOptional()
  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsNumber()
  department_id: number;

  @IsNotEmpty()
  @IsNumber()
  municipality_id: number;

  @IsOptional()
  @IsNumber()
  disability_type_id?: number;

  @IsNotEmpty()
  @IsNumber()
  gender_id: number;

  @IsOptional()
  @IsNumber()
  area_id?: number;

  @IsOptional()
  @IsNumber()
  country_id?: number;
}
