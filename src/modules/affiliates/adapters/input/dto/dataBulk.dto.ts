import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class BulkAffiliateRowDto {
  // columnas comunes
  identificationType: string; // ej. "CC"
  identificationNumber: number;
  birthdate: string; // 'YYYY-MM-DD'
  firstName?: string;
  middleName?: string;
  firstLastName?: string;
  middleLastName?: string;
  sex?: string; // "F" | "M"
  countryCod: string; // "CO"
  departmentCode?: number; // 25
  municipalityCode?: number; // 25572
  area?: string; // "U" | "R"
  neighborhood?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;

  eps?: string;
  populationTypeId?: number; // si acá sí usas ID, ok
  state?: string;
  level?: number;
  groupSubgroup?: string;
  dateOfAffiliated?: string; // 'YYYY-MM-DD'
  sisbenNumber?: string;

  valorLMA: number;
}

export class BulkAffiliateDto {
  @IsNotEmpty()
  @IsNumber()
  organizationId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  @Matches(/^(MS(CM)?|MC(CM)?)\d{6}$/) // nombre de archivo sin extensión
  fileName: string;

  @IsIn([1, 2])
  @IsNumber()
  regime: 1 | 2; // 1=subsidiado, 2=contributivo

  @IsString()
  @Matches(/^\d{6}$/) // AAAAMM
  period: string;

  @IsArray()
  rows: BulkAffiliateRowDto[];
}
