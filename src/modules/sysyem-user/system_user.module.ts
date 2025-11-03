import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { System_usersEntity } from '../../common/entities/system_users.entity';
import { RoleEntity } from '../../common/entities/role.entity';
import { OrganizationEntity } from '../../common/entities/organization.entity';

//Controller
import { SystemUserController } from './adapters/input/system-user.controller';

//Use-case
import { Create_userUsecase } from './domain/input-ports/use-cases/create_user.usecase';
import { List_userUsecase } from './domain/input-ports/use-cases/list_user.usecase';
import { Update_userUsecase } from './domain/input-ports/use-cases/update_user.usecase';
import { Toogle_userUsecase } from './domain/input-ports/use-cases/toogle_user.usecase';
import { Delete_userUsecase } from './domain/input-ports/use-cases/delete_user.usecase';

//Interface
import { ISystemUserRepository } from './domain/output-ports/system_user.repository';
import { IRoleRepository } from '../role/domain/output-ports/role.repository';
import { IOrganizationRepository } from '../organization/domain/output-ports/organization.repository';

//Repository
import { System_user_mysqlRepository } from './domain/output-ports/mysql/system_user_mysql.repository';
import { Role_mysqlRepository } from '../role/domain/output-ports/mysql/role_mysql.repository';
import { OrganizationMysqlRepository } from '../organization/domain/output-ports/mysql/organization_mysql.repository';

@Module({
  imports: [
    // Importar entidades a TypeORM
    TypeOrmModule.forFeature([
      RoleEntity,
      OrganizationEntity,
      System_usersEntity,
    ]),
  ],
  controllers: [SystemUserController],
  providers: [
    Create_userUsecase, //Caso de uso
    List_userUsecase,
    Update_userUsecase,
    Delete_userUsecase,
    Toogle_userUsecase,
    {
      provide: ISystemUserRepository,
      useClass: System_user_mysqlRepository,
    },
    {
      provide: IRoleRepository,
      useClass: Role_mysqlRepository,
    },
    {
      provide: IOrganizationRepository,
      useClass: OrganizationMysqlRepository,
    },
  ],
  exports: [System_userModule],
})
export class System_userModule {}
