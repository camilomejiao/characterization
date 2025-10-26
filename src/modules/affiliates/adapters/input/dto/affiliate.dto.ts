import {
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AffiliateDto {
  // Usuario
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  // Regimen - requerido (entity: nullable: false)
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  regimeId: number;

  //EPS
  @Type(() => Number)
  @IsInt()
  @Min(1)
  epsId?: number;

  // IPS primaria - requerido (entity: nullable: false)
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ipsPrimaryId: number;

  // IPS dental - requerido (entity: nullable: false)
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ipsDentalId: number;

  //
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  populationTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  stateId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  affiliateTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  methodologyId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  levelId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  membershipClassId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ethnicityId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  communityId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  groupSubgroupId?: number;

  // -------- Opcionales (entity: nullable: true) --------
  @IsOptional()
  @IsString()
  sisbenNumber?: string;

  @IsOptional()
  @IsString()
  formNumber?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsDateString()
  dateOfAffiliated?: string;
}
