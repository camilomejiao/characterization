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

//
import { System_usersEntity } from '../../../../common/entities/system_users.entity';

//Guard
import { AuthGuard } from '@nestjs/passport';

//Dto
import { Create_userDto } from './dto/create_user.dto';

//Use Case
import { Create_userUsecase } from '../../domain/input-ports/use-cases/create_user.usecase';
import { List_userUsecase } from '../../domain/input-ports/use-cases/list_user.usecase';
import { Update_userUsecase } from '../../domain/input-ports/use-cases/update_user.usecase';
import { Delete_userUsecase } from '../../domain/input-ports/use-cases/delete_user.usecase';
import { Toogle_userUsecase } from '../../domain/input-ports/use-cases/toogle_user.usecase';
import { Update_userDto } from './dto/update_user.dto';

@Controller('admins')
export class SystemUserController {
  constructor(
    @Inject(Create_userUsecase)
    private readonly createUserUsecase: Create_userUsecase,
    @Inject(List_userUsecase)
    private readonly listUsersUsecase: List_userUsecase,
    @Inject(Update_userUsecase)
    private readonly updateUserUsecase: Update_userUsecase,
    @Inject(Delete_userUsecase)
    private readonly deleteUserUsecase: Delete_userUsecase,
    @Inject(Toogle_userUsecase)
    private readonly toggleUserStatusUsecase: Toogle_userUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() systemUserDto: Create_userDto,
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
    @Body() updateUserDto: Update_userDto,
  ): Promise<System_usersEntity> {
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
