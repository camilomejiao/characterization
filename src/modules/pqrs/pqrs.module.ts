import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controller
import { PqrsController } from './adapter/input/pqrs.controller';

//Entity
import { PqrsTypeEntity } from '../../common/entities/pqrs-type.entity';
import { ApplicationStatusEntity } from '../../common/entities/application-status.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { PqrsEntity } from '../../common/entities/pqrs.entity';
import { AffiliatesEntity } from '../../common/entities/affiliate.entity';

//Use case
import { CreatePqrsUsecase } from './domain/input-ports/usecase/create-pqrs.usecase';
import { GetPqrsByIdUsecase } from './domain/input-ports/usecase/get-pqrs-by-id.usecase';
import { GetPqrsBydocumentUsecase } from './domain/input-ports/usecase/get-pqrs-bydocument.usecase';
import { UpdatePqrsUsecase } from './domain/input-ports/usecase/update-pqrs.usecase';
import { ValidateAndAssignRelationsUsecase } from './domain/input-ports/usecase/validate-and-assign-relations.usecase';

//Repository
import { IPqrsRepository } from './domain/output-ports/pqrs.repository';
import { PqrsMysqlRepository } from './domain/output-ports/mysql/pqrs-mysql.repository';
import { IPqrsTypeRepository } from '../common/domain/output-ports/pqrs-type.repository';
import { PqrsTypeMysqlRepository } from '../common/domain/output-ports/mysql/pqrs-type-mysql.repository';
import { IApplicationStatusRepository } from '../common/domain/output-ports/application-status.repository';
import { ApplicationStatusMysqlRepository } from '../common/domain/output-ports/mysql/application-status-mysql.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { DepartmentMysqlRepository } from '../department-municipality/domain/output-ports/mysql/department-mysql.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { MunicipalityMysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality-mysql.repository';
import { AffiliateMysqlRepository } from '../affiliates/domain/output-ports/mysql/affiliate-mysql.repository';
import { IAffiliateRepository } from '../affiliates/domain/output-ports/affiliate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PqrsEntity,
      PqrsTypeEntity,
      ApplicationStatusEntity,
      DepartmentEntity,
      MunicipalityEntity,
      AffiliatesEntity,
    ]),
  ],
  controllers: [PqrsController],
  providers: [
    CreatePqrsUsecase,
    GetPqrsByIdUsecase,
    GetPqrsBydocumentUsecase,
    UpdatePqrsUsecase,
    ValidateAndAssignRelationsUsecase,
    {
      provide: IAffiliateRepository,
      useClass: AffiliateMysqlRepository,
    },
    {
      provide: IPqrsRepository,
      useClass: PqrsMysqlRepository,
    },
    {
      provide: IPqrsTypeRepository,
      useClass: PqrsTypeMysqlRepository,
    },
    {
      provide: IApplicationStatusRepository,
      useClass: ApplicationStatusMysqlRepository,
    },
    {
      provide: IDepartmentRepository,
      useClass: DepartmentMysqlRepository,
    },
    {
      provide: IMunicipalityRepository,
      useClass: MunicipalityMysqlRepository,
    },
  ],
  exports: [PqrsModule],
})
export class PqrsModule {}
