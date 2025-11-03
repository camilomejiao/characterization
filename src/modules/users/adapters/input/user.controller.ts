import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

//Dto
import { Create_userDto } from './dto/create_user.dto';
import { Update_userDto } from './dto/update_user.dto';

//Use Case
import { Create_userUsecase } from '../../domain/input-ports/use-cases/create_user.usecase';
import { Update_userUsecase } from '../../domain/input-ports/use-cases/update_user.usecase';
import { Get_userUsecase } from '../../domain/input-ports/use-cases/get_user.usecase';
import { Delete_userUsecase } from '../../domain/input-ports/use-cases/delete_user.usecase';
import { RoleEntity } from '../../../../common/entities/role.entity';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    role: RoleEntity;
    organization: number;
    iat?: number;
    exp?: number;
  };
}

@Controller('users')
export class UserController {
  constructor(
    @Inject(Create_userUsecase)
    private readonly createUserUsecase: Create_userUsecase,
    @Inject(Update_userUsecase)
    private readonly updateUserUsecase: Update_userUsecase,
    @Inject(Get_userUsecase)
    private readonly getUserUsecase: Get_userUsecase,
    @Inject(Delete_userUsecase)
    private readonly deleteUserUsecase: Delete_userUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() userDto: Create_userDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user?.organization;

    const user = await this.createUserUsecase.handler(userDto, userId);
    if (user) {
      return { data: { type: 'users', id: `${user.id}` } };
    }
    throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Param('id') id: number) {
    return await this.getUserUsecase.handler(id);
  }

  @Get('identification/:identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getUserByIdentification(
    @Param('identificationNumber') identificationNumber: number,
  ) {
    const number = identificationNumber;

    if (isNaN(number)) {
      throw new BadRequestException('Parámetros inválidos');
    }

    return await this.getUserUsecase.userIdentification(number);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async listUsers() {
    return await this.getUserUsecase.listAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Param('id') id: number,
    @Body() userDto: Update_userDto,
  ) {
    return await this.updateUserUsecase.handler(id, userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Param('id') id: number) {
    return await this.deleteUserUsecase.handler(id);
  }
}
