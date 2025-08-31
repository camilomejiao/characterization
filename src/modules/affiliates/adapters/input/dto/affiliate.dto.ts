import {
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class AffiliateDto {
  //Si el usuario ya existe, se envía solo el userId
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  //Datos de afiliación (obligatorios)
  @IsNotEmpty()
  @IsNumber()
  populationTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  epsId: number;

  @IsNotEmpty()
  @IsNumber()
  stateId: number;

  @IsNotEmpty()
  @IsNumber()
  affiliateTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  methodologyId: number;

  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @IsNotEmpty()
  @IsNumber()
  membershipClassId: number;

  @IsNotEmpty()
  @IsNumber()
  ethnicityId: number;

  @IsOptional()
  @IsNumber()
  communityId: number | null;

  @IsOptional()
  @IsNumber()
  groupSubgroupId: number | null;

  @IsOptional()
  @IsString()
  sisbenNumber: string | null;

  @IsOptional()
  @IsDateString()
  dateOfAffiliated: string | null;

  @IsOptional()
  @IsString()
  observations: string | null;
}
