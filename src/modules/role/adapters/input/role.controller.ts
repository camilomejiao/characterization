import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { CreateRoleUseCase } from '../../domain/input-ports/use-cases/create-role.usecase';
import { RoleEntity } from '../../../../common/entities/role.entity';
import { excludeMethod, JsonApi, JsonBaseController } from 'json-api-nestjs';
import { IRoleRepository } from '../../domain/output-ports/role.repository';
import { AuthGuard } from '@nestjs/passport';

@JsonApi(RoleEntity, {
  allowMethod: excludeMethod([]),
  requiredSelectField: true,
  overrideRoute: 'roles',
})
@ApiTags('roles')
@Controller('roles')
export class RoleController extends JsonBaseController<RoleEntity> {
  constructor(
    @Inject(CreateRoleUseCase)
    private readonly createRoleUseCase: CreateRoleUseCase,
    @Inject(IRoleRepository)
    private readonly roleRepository: IRoleRepository,
  ) {
    super();
  }

  @ApiResponse({
    status: 201,
    description: 'Returns a created role',
    schema: {
      properties: {
        status: { type: 'number' },
      },
      example: {
        status: 201,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Returns a bad request error',
    schema: {
      properties: {
        status: { type: 'number' },
        message: { type: 'string' },
        error: { type: 'string' },
      },
      example: {
        status: 400,
        message: 'Bad Request',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Returns a conflict error',
    schema: {
      properties: {
        status: { type: 'number' },
        message: { type: 'string' },
        error: { type: 'string' },
      },
      example: {
        status: 409,
        message: 'Conflict',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Returns an internal server error',
    schema: {
      properties: {
        status: { type: 'number' },
        message: { type: 'string' },
        error: { type: 'string' },
      },
      example: {
        status: 500,
        message: 'Bad Request',
        error: 'Bad Request',
      },
    },
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() roleDto: RoleDto) {
    const role = await this.createRoleUseCase.handler(roleDto);

    if (role) {
      return {
        data: {
          type: 'users',
          id: `${role.id}`,
          attributes: role,
        },
      };
    }

    if (!role) {
      throw new HttpException('Role not created', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async get(): Promise<RoleEntity[]> {
    return await this.roleRepository.findAll(); // Utiliza el método del repositorio
  }
}
