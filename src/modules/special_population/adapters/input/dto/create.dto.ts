import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  // Usuario
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  //
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  populationTypeId: number;

  //EPS
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  epsId: number | null;

  //State
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  affiliatedStateId: number | null;

  //Etnia
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ethnicityId: number;

  //Tiene eps?
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hasEpsAffiliate: number;

  //
  @IsOptional()
  @IsString()
  observations?: string;
}
