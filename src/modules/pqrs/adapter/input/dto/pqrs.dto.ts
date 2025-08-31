import {
  IsNotEmpty,
  IsString,
  IsDateString,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreatePqrsDto {
  @IsNotEmpty()
  @IsNumber()
  pqrsTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  applicationStatusId: number;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsNumber()
  municipalityId: number;

  @IsNotEmpty()
  @IsNumber()
  epsId: number;

  @IsNotEmpty()
  @IsNumber()
  reasonId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  entity: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfEvents: string;

  @IsNotEmpty()
  @IsString()
  descriptionOfEvents: string;
}

export class UpdatePqrsDto {
  @IsNotEmpty()
  @IsNumber()
  pqrsTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  applicationStatusId: number;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsNumber()
  municipalityId: number;

  @IsNotEmpty()
  @IsNumber()
  epsId: number;

  @IsNotEmpty()
  @IsNumber()
  reasonId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  entity: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfEvents: string;

  @IsNotEmpty()
  @IsString()
  descriptionOfEvents: string;
}

export class NotificationHistoryPqrsDto {
  @IsNotEmpty()
  @IsNumber()
  applicationStatusId: number;

  @IsNotEmpty()
  @IsString()
  notification: string;
}
