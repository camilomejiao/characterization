import { IsArray, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class BulkAffiliateRowDto {
  // columnas comunes
  identificationTypeId: number;
  identificationNumber: number;
  firstName?: string;
  middleName?: string;
  firstLastName?: string;
  middleLastName?: string;
  birthdate?: string; // 'YYYY-MM-DD'
  email?: string;
  phoneNumber?: string;
  neighborhood?: string;
  address?: string;
  departmentId?: number;
  municipalityId?: number;
  countryId?: number;
  areaId?: number;
  genderId?: number;
  disabilityTypeId?: number;

  // affiliate fields
  populationTypeId?: number;
  epsId?: number;
  ipsPrimaryId: number;
  ipsDentalId: number;
  stateId?: number;
  affiliateTypeId?: number;
  methodologyId?: number;
  levelId?: number;
  membershipClassId?: number;
  ethnicityId?: number;
  communityId?: number;
  groupSubgroupId?: number;
  dateOfAffiliated?: string; // 'YYYY-MM-DD'
  sisbenNumber?: string;
  formNumber?: string;

  // LMA
  valorLMA: number; // requerido
}

export class BulkAffiliateDto {
  @IsNotEmpty()
  organizationId: number;

  @IsString()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @Matches(/^(MS(CM)?|MC(CM)?)\d{6}$/) // nombre de archivo sin extensión
  fileName: string;

  @IsIn(['S', 'C'])
  regime: 'S' | 'C'; // S=subsidiado, C=contributivo

  @IsString()
  @Matches(/^\d{6}$/) // AAAAMM
  period: string;

  @IsArray()
  rows: BulkAffiliateRowDto[];
}
