import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { CreateRoleUseCase } from '../../domain/input-ports/use-cases/create-role.usecase';
import { Role } from '../../../../common/entities/role.entity';
import { excludeMethod, JsonApi, JsonBaseController } from 'json-api-nestjs';

@JsonApi(Role, {
  allowMethod: excludeMethod([
    'patchOne',
    'postOne',
    'deleteOne',
    'deleteRelationship',
    'getRelationship',
    'postRelationship',
    'patchRelationship',
  ]),
  requiredSelectField: true,
  overrideRoute: 'roles',
})
@ApiTags('roles')
@Controller('roles')
export class RoleController extends JsonBaseController<Role> {
  constructor(
    @Inject(CreateRoleUseCase)
    private readonly createRoleUseCase: CreateRoleUseCase,
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
  public async create(@Body() roleDto: RoleDto) {
    const role = await this.createRoleUseCase.handler(roleDto.data.attributes);

    if (role) {
      return {
        meta: {},
        data: {
          type: 'users',
          id: `${role.id}`,
          attributes: role,
          links: {
            self: `/role/${role.id}`,
          },
        },
      };
    }

    if (!role) {
      throw new HttpException('Role not created', HttpStatus.BAD_REQUEST);
    }
  }
}
