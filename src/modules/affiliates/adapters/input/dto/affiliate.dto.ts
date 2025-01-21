import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class AffiliateDto {
  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @ApiProperty({ example: 55 })
  @IsNotEmpty()
  @IsNumber()
  municipalityId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({ example: 123456789 })
  @IsNotEmpty()
  @IsNumber()
  identificationNumber: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  populationTypeId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  epsId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  disabilityTypeId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  genderId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  affiliateTypeId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  areaId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  methodologyId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  membershipClassId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  ethnicityId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  communityId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  groupSubgroupId: number;

  @ApiProperty({ example: 'Juan' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Carlos', required: false })
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty({ example: 'Pérez' })
  @IsNotEmpty()
  @IsString()
  firstLastName: string;

  @ApiProperty({ example: 'López', required: false })
  @IsOptional()
  @IsString()
  middleLastName: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+573001234567', required: false })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Neighborhood', required: false })
  @IsOptional()
  @IsString()
  neighborhood: string;

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  sisbenScore: number;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  sisbenRegistrationDate: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  highCost: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  featuresSurvival: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  namesake: number;

  @ApiProperty({ example: 'Observations', required: false })
  @IsOptional()
  @IsString()
  observations: string;
}
