import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { SystemUsers } from '../../common/entities/system-users.entity';
import { RoleEntity } from '../../common/entities/role.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';

//Controller
import { SystemUserController } from './adapters/input/system-user.controller';

//Use-case
import { CreateUserUsecase } from './domain/input-ports/use-cases/create-user.usecase';

//Repository
import { ISystemUserRepository } from './domain/output-ports/system-user.repository';
import { SystemUserMysqlRepository } from './domain/output-ports/mysql/system-user-mysql.repository';
import { IRoleRepository } from '../role/domain/output-ports/role.repository';
import { RoleMysqlRepository } from '../role/domain/output-ports/mysql/role-mysql.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { DepartmentMysqlRepository } from '../department-municipality/domain/output-ports/mysql/department-mysql.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { MunicipalityMysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality-mysql.repository';

@Module({
  imports: [
    // Importar entidades a TypeORM
    TypeOrmModule.forFeature([
      RoleEntity,
      DepartmentEntity,
      MunicipalityEntity,
      SystemUsers,
    ]),
  ],
  controllers: [SystemUserController],
  providers: [
    CreateUserUsecase, // Caso de uso
    {
      provide: IRoleRepository,
      useClass: RoleMysqlRepository,
    },
    {
      provide: IDepartmentRepository,
      useClass: DepartmentMysqlRepository,
    },
    {
      provide: IMunicipalityRepository,
      useClass: MunicipalityMysqlRepository,
    },
    {
      provide: ISystemUserRepository,
      useClass: SystemUserMysqlRepository,
    },
  ],
  exports: [SystemUserModule],
})
export class SystemUserModule {}
