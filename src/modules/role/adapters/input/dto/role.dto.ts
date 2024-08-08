import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Attributes {
  @ApiProperty({ example: 'role' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  is_active: number;
}
class Data {
  @ApiProperty({ example: 'role' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({ type: Attributes })
  @ValidateNested()
  @Type(() => Attributes)
  attributes: Attributes;
}
export class RoleDto {
  @ApiProperty({ type: Data })
  @ValidateNested()
  @Type(() => Data)
  data: Data;
}
