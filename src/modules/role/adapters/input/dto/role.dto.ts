import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 'role' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'description role' })
  description: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  is_active: number;
}
