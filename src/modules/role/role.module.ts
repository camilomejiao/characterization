import { Module } from '@nestjs/common';
import { JsonApiModule } from 'json-api-nestjs';

//
import { RoleEntity } from '../../common/entities/role.entity';

//Use Case
import { Create_roleUsecase } from './domain/input-ports/use-cases/create_role.usecase';

//Interface
import { IRoleRepository } from './domain/output-ports/role.repository';

//Repo
import { Role_mysqlRepository } from './domain/output-ports/mysql/role_mysql.repository';
import { RoleController } from './adapters/input/role.controller';

@Module({
  imports: [
    JsonApiModule.forRoot({
      entities: [RoleEntity],
      providers: [
        Create_roleUsecase,
        {
          provide: IRoleRepository,
          useClass: Role_mysqlRepository,
        },
      ],
      controllers: [RoleController],
    }),
  ],
  exports: [RoleModule],
})
export class RoleModule {}
