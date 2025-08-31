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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Use Case
import { CreateUserUsecase } from '../../domain/input-ports/use-cases/create-user.usecase';
import { UpdateUserUsecase } from '../../domain/input-ports/use-cases/update-user.usecase';
import { GetUserUsecase } from '../../domain/input-ports/use-cases/get-user.usecase';
import { DeleteUserUsecase } from '../../domain/input-ports/use-cases/delete-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
    @Inject(UpdateUserUsecase)
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(GetUserUsecase)
    private readonly getUserUsecase: GetUserUsecase,
    @Inject(DeleteUserUsecase)
    private readonly deleteUserUsecase: DeleteUserUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() userDto: CreateUserDto) {
    const user = await this.createUserUsecase.handler(userDto);
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

  @Get('identification/:identificationType/:identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getUserByIdentification(
    @Param('identificationType') identificationType: number,
    @Param('identificationNumber') identificationNumber: number,
  ) {
    const typeId = identificationType;
    const number = identificationNumber;

    if (isNaN(typeId) || isNaN(number)) {
      throw new BadRequestException('Parámetros inválidos');
    }

    return await this.getUserUsecase.userIdentification(typeId, number);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async listUsers() {
    return await this.getUserUsecase.listAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return await this.updateUserUsecase.handler(id, userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Param('id') id: number) {
    return await this.deleteUserUsecase.handler(id);
  }
}
