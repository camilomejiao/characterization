import { IsNotEmpty, IsNumber } from 'class-validator';

export class Create_organizationDto {
  @IsNotEmpty()
  nit: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  department_id: number;

  @IsNotEmpty()
  @IsNumber()
  municipality_id: number;

  @IsNotEmpty()
  @IsNumber()
  active;
}
