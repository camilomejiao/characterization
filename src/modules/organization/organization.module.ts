import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { OrganizationEntity } from '../../common/entities/organization.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
//Controller
import { OrganizationController } from './adapters/inputs/organization.controller';

//Use Case
import { Create_organizationUsecase } from './domain/input-ports/use-case/create_organization.usecase';
import { ListOrganizationUsecase } from './domain/input-ports/use-case/list_organization.usecase';
import { UpdateOrganziationUsecase } from './domain/input-ports/use-case/update_organziation.usecase';
import { DeleteOrganizationUsecase } from './domain/input-ports/use-case/delete_organization.usecase';
import { ToogleOrganizationUsecase } from './domain/input-ports/use-case/toogle_organization.usecase';

//Interface
import { IOrganizationRepository } from './domain/output-ports/organization.repository';

//Repository
import { OrganizationMysqlRepository } from './domain/output-ports/mysql/organization_mysql.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { Department_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/department_mysql.repository';
import { Municipality_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality_mysql.repository';

@Module({
  imports: [
    // Importar entidades a TypeORM
    TypeOrmModule.forFeature([
      OrganizationEntity,
      DepartmentEntity,
      MunicipalityEntity,
    ]),
  ],
  controllers: [OrganizationController],
  providers: [
    Create_organizationUsecase,
    ListOrganizationUsecase,
    UpdateOrganziationUsecase,
    DeleteOrganizationUsecase,
    ToogleOrganizationUsecase,
    {
      provide: IOrganizationRepository,
      useClass: OrganizationMysqlRepository,
    },
    {
      provide: IDepartmentRepository,
      useClass: Department_mysqlRepository,
    },
    {
      provide: IMunicipalityRepository,
      useClass: Municipality_mysqlRepository,
    },
  ],
  exports: [OrganizationModule],
})
export class OrganizationModule {}
