import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreatePqrsDto {
  @ApiProperty({ example: 1, description: 'ID del tipo de PQRS' })
  @IsNotEmpty()
  @IsInt()
  pqrsTypeId: number;

  @ApiProperty({ example: 1, description: 'ID del estado de la solicitud' })
  @IsNotEmpty()
  @IsInt()
  applicationStatusId: number;

  @ApiProperty({ example: 11, description: 'ID del departamento' })
  @IsNotEmpty()
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: 149, description: 'ID del municipio' })
  @IsNotEmpty()
  @IsInt()
  municipalityId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario que realiza la solicitud',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'Falta de servicio',
    description: 'Razón de la solicitud',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  reason: string;

  @ApiProperty({ example: 'Entidad ABC', description: 'Entidad involucrada' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  entity: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Persona responsable' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  responsible: string;

  @ApiProperty({
    example: '2025-01-20',
    description: 'Fecha de los eventos relacionados con la solicitud',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfEvents: string;

  @ApiProperty({
    example: 'Se realizó un corte de agua sin previo aviso.',
    description: 'Descripción detallada de los eventos',
  })
  @IsNotEmpty()
  @IsString()
  descriptionOfEvents: string;

  @ApiProperty({
    example: 'Calle 123, Barrio Centro',
    description: 'Dirección relacionada',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;
}

export class UpdatePqrsDto {
  @ApiProperty({
    example: 1,
    description: 'ID del tipo de PQRS',
    required: false,
  })
  @IsOptional()
  @IsInt()
  pqrsTypeId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del estado de la solicitud',
    required: false,
  })
  @IsOptional()
  @IsInt()
  applicationStatusId?: number;

  @ApiProperty({
    example: 11,
    description: 'ID del departamento',
    required: false,
  })
  @IsOptional()
  @IsInt()
  departmentId?: number;

  @ApiProperty({
    example: 149,
    description: 'ID del municipio',
    required: false,
  })
  @IsOptional()
  @IsInt()
  municipalityId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario que realiza la solicitud',
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    example: 'Falta de servicio',
    description: 'Razón de la solicitud',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;

  @ApiProperty({
    example: 'Entidad ABC',
    description: 'Entidad involucrada',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  entity?: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Persona responsable',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  responsible?: string;

  @ApiProperty({
    example: '2025-01-20',
    description: 'Fecha de los eventos relacionados con la solicitud',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfEvents?: string;

  @ApiProperty({
    example: 'Se realizó un corte de agua sin previo aviso.',
    description: 'Descripción detallada de los eventos',
    required: false,
  })
  @IsOptional()
  @IsString()
  descriptionOfEvents?: string;

  @ApiProperty({
    example: 'Calle 123, Barrio Centro',
    description: 'Dirección relacionada',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
