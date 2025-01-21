import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdateAffiliateDto {
  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  departmentId: number;

  @ApiProperty({ example: 55, required: false })
  @IsOptional()
  @IsNumber()
  municipalityId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({ example: 123456789, required: false })
  @IsOptional()
  @IsNumber()
  identificationNumber: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  populationTypeId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  epsId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  disabilityTypeId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  genderId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  affiliateTypeId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  areaId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  methodologyId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  levelId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  membershipClassId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  ethnicityId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  communityId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  groupSubgroupId: number;

  @ApiProperty({ example: 'Juan', required: false })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Carlos', required: false })
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty({ example: 'Pérez', required: false })
  @IsOptional()
  @IsString()
  firstLastName: string;

  @ApiProperty({ example: 'López', required: false })
  @IsOptional()
  @IsString()
  middleLastName: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  birthdate: string;

  @ApiProperty({ example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+573001234567', required: false })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '', required: false })
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
