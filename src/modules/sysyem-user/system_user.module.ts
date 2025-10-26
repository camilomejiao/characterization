import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { System_usersEntity } from '../../common/entities/system_users.entity';
import { RoleEntity } from '../../common/entities/role.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';

//Controller
import { SystemUserController } from './adapters/input/system-user.controller';

//Use-case
import { Create_userUsecase } from './domain/input-ports/use-cases/create_user.usecase';
import { List_userUsecase } from './domain/input-ports/use-cases/list_user.usecase';
import { Update_userUsecase } from './domain/input-ports/use-cases/update_user.usecase';
import { Toogle_userUsecase } from './domain/input-ports/use-cases/toogle_user.usecase';
import { Delete_userUsecase } from './domain/input-ports/use-cases/delete_user.usecase';

//Repository
import { ISystemUserRepository } from './domain/output-ports/system_user.repository';
import { System_user_mysqlRepository } from './domain/output-ports/mysql/system_user_mysql.repository';
import { IRoleRepository } from '../role/domain/output-ports/role.repository';
import { Role_mysqlRepository } from '../role/domain/output-ports/mysql/role_mysql.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { Department_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/department_mysql.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { Municipality_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality_mysql.repository';

@Module({
  imports: [
    // Importar entidades a TypeORM
    TypeOrmModule.forFeature([
      RoleEntity,
      DepartmentEntity,
      MunicipalityEntity,
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
      provide: IRoleRepository,
      useClass: Role_mysqlRepository,
    },
    {
      provide: IDepartmentRepository,
      useClass: Department_mysqlRepository,
    },
    {
      provide: IMunicipalityRepository,
      useClass: Municipality_mysqlRepository,
    },
    {
      provide: ISystemUserRepository,
      useClass: System_user_mysqlRepository,
    },
  ],
  exports: [System_userModule],
})
export class System_userModule {}
