import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SystemUserDto } from './dto/system-user.dto';
import { CreateUserUsecase } from '../../domain/input-ports/use-cases/create-user.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('admins')
export class SystemUserController {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() systemUserDto: SystemUserDto) {
    console.log('SystemUserDto: ', SystemUserDto);
    const user = await this.createUserUsecase.handler(systemUserDto);

    if (user) {
      return {
        data: {
          type: 'admins',
          id: `${user.id}`,
        },
      };
    }

    if (!user) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
  }
}
