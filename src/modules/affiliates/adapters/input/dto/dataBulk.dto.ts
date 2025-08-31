import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DataBulkDto {
  @IsNotEmpty()
  @IsString()
  identification_type: string;

  @IsNotEmpty()
  @IsNumber()
  identification_number: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  first_last_name: string;

  @IsOptional()
  @IsString()
  middle_last_name: string;

  @IsNotEmpty()
  @IsString()
  eps: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  population_type: number;

  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsNumber()
  department_code: number;

  @IsNotEmpty()
  @IsNumber()
  municipality_code: number;

  @IsNotEmpty()
  @IsString()
  state_code: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_affiliated: string;

  @IsNotEmpty()
  @IsString()
  sisben: string;

  @IsNotEmpty()
  @IsNumber()
  dpt_survival: number;

  @IsNotEmpty()
  @IsNumber()
  mun_survival: number;

  @IsNotEmpty()
  @IsString()
  sisben_number: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class Data {
  @ApiProperty({ type: [DataBulkDto] })
  @ValidateNested()
  @Type(() => DataBulkDto)
  dataBulkDto: DataBulkDto[];
}
