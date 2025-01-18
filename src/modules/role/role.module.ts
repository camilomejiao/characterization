import { Module } from '@nestjs/common';
import { JsonApiModule } from 'json-api-nestjs';

//
import { RoleEntity } from '../../common/entities/role.entity';

//Use Case
import { CreateRoleUseCase } from './domain/input-ports/use-cases/create-role.usecase';

//Interface
import { IRoleRepository } from './domain/output-ports/role.repository';

//Repo
import { RoleMysqlRepository } from './domain/output-ports/mysql/role-mysql.repository';
import { RoleController } from './adapters/input/role.controller';

@Module({
  imports: [
    JsonApiModule.forRoot({
      entities: [RoleEntity],
      providers: [
        CreateRoleUseCase,
        {
          provide: IRoleRepository,
          useClass: RoleMysqlRepository,
        },
      ],
      controllers: [RoleController],
    }),
  ],
  exports: [RoleModule],
})
export class RoleModule {}
