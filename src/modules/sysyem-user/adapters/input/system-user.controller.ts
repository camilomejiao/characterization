import {
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

//Guard
import { AuthGuard } from '@nestjs/passport';

//Dto
import { CreateUserDto } from './dto/create-user.dto';

//Use Case
import { CreateUserUsecase } from '../../domain/input-ports/use-cases/create-user.usecase';
import { ListUserUsecase } from '../../domain/input-ports/use-cases/list-user.usecase';
import { UpdateUserUsecase } from '../../domain/input-ports/use-cases/update-user.usecase';
import { DeleteUserUsecase } from '../../domain/input-ports/use-cases/delete-user.usecase';
import { ToogleUserUsecase } from '../../domain/input-ports/use-cases/toogle-user.usecase';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admins')
export class SystemUserController {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
    @Inject(ListUserUsecase)
    private readonly listUsersUsecase: ListUserUsecase,
    @Inject(UpdateUserUsecase)
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(DeleteUserUsecase)
    private readonly deleteUserUsecase: DeleteUserUsecase,
    @Inject(ToogleUserUsecase)
    private readonly toggleUserStatusUsecase: ToogleUserUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() systemUserDto: CreateUserDto,
  ): Promise<{ data: { type: string; id: string } }> {
    try {
      const user = await this.createUserUsecase.handler(systemUserDto);

      if (!user) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }

      return {
        data: {
          type: 'admins',
          id: `${user.id}`,
        },
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  public async listUsers() {
    return await this.listUsersUsecase.handler();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Param('id') id: number) {
    return await this.listUsersUsecase.getById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.updateUserUsecase.handler(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  public async deleteUser(@Param('id') id: number) {
    await this.deleteUserUsecase.handler(id);
    return { message: 'User deleted successfully' };
  }

  @Put('toggle-status/:id')
  @UseGuards(AuthGuard('jwt'))
  public async toggleStatus(
    @Param('id') id: number,
    @Body() body: { status: number },
  ) {
    return await this.toggleUserStatusUsecase.handler(id, body.status);
  }
}
