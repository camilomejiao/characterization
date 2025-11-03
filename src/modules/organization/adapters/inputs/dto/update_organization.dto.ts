import { PartialType } from '@nestjs/mapped-types';
import { Create_organizationDto } from './create_organization.dto';

export class Update_organizationDto extends PartialType(
  Create_organizationDto,
) {}
