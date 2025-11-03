import { PartialType } from '@nestjs/mapped-types';
import { Create_userDto } from './create_user.dto';

export class Update_userDto extends PartialType(Create_userDto) {}
