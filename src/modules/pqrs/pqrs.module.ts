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
import { ReasonPqrsEntity } from '../../common/entities/reason-pqrs.entity';
import { UserEntity } from '../../common/entities/user.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { PqrsNotificationEntity } from '../../common/entities/pqrs-notification.entity';

//Use case
import { CreatePqrsUsecase } from './domain/input-ports/usecase/create-pqrs.usecase';
import { GetPqrsBydocumentUsecase } from './domain/input-ports/usecase/get-pqrs-bydocument.usecase';
import { UpdatePqrsUsecase } from './domain/input-ports/usecase/update-pqrs.usecase';
import { ValidateAndAssignRelationsUsecase } from './domain/input-ports/usecase/validate-and-assign-relations.usecase';
import { GetPqrsUsecase } from './domain/input-ports/usecase/get-pqrs.usecase';
import { DeletePqrsUsecase } from './domain/input-ports/usecase/delete-pqrs.usecase';

//Interface
import { IPqrsRepository } from './domain/output-ports/pqrs.repository';
import { IPqrsTypeRepository } from '../common/domain/output-ports/pqrs-type.repository';
import { IApplicationStatusRepository } from '../common/domain/output-ports/application-status.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { IReasonPqrsRepository } from '../common/domain/output-ports/reason-pqrs.repository';
import { IUserRepository } from '../users/domain/output-ports/user.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { INotificationPrqsRepository } from './domain/output-ports/notification-prqs.repository';
import { IFileSigningPortRepository } from './domain/output-ports/s3/file-signing.port.repository';

//Repository
import { PqrsMysqlRepository } from './domain/output-ports/mysql/pqrs-mysql.repository';
import { PqrsTypeMysqlRepository } from '../common/domain/output-ports/mysql/pqrs-type-mysql.repository';
import { ApplicationStatusMysqlRepository } from '../common/domain/output-ports/mysql/application-status-mysql.repository';
import { DepartmentMysqlRepository } from '../department-municipality/domain/output-ports/mysql/department-mysql.repository';
import { MunicipalityMysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality-mysql.repository';
import { ReasonPqrsMysqlRepository } from '../common/domain/output-ports/mysql/reason-pqrs-mysql.repository';
import { UserMysqlRepository } from '../users/domain/output-ports/mysql/user-mysql.repository';
import { EpsMysqlRepository } from '../common/domain/output-ports/mysql/eps-mysql.repository';
import { CreateNotificationPqrsUsecase } from './domain/input-ports/usecase/create-notification-pqrs.usecase';
import { NotificationPrqsMysqlRepository } from './domain/output-ports/mysql/notification-prqs-mysql.repository';
import { GetPqrsDetailByIdUsecase } from './domain/input-ports/usecase/get-pqrs-detail-by-id.usecase';

//Adapter
import { S3FileStorageAdapter } from './adapter/output/s3/s3-file-storage.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PqrsEntity,
      PqrsTypeEntity,
      ApplicationStatusEntity,
      DepartmentEntity,
      MunicipalityEntity,
      ReasonPqrsEntity,
      UserEntity,
      EpsEntity,
      PqrsNotificationEntity,
    ]),
  ],
  controllers: [PqrsController],
  providers: [
    CreatePqrsUsecase,
    GetPqrsDetailByIdUsecase,
    GetPqrsUsecase,
    GetPqrsBydocumentUsecase,
    UpdatePqrsUsecase,
    ValidateAndAssignRelationsUsecase,
    CreateNotificationPqrsUsecase,
    DeletePqrsUsecase,
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
    {
      provide: IReasonPqrsRepository,
      useClass: ReasonPqrsMysqlRepository,
    },
    {
      provide: IEpsRepository,
      useClass: EpsMysqlRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserMysqlRepository,
    },
    {
      provide: INotificationPrqsRepository,
      useClass: NotificationPrqsMysqlRepository,
    },
    {
      provide: IFileSigningPortRepository,
      useClass: S3FileStorageAdapter,
    },
  ],
  exports: [PqrsModule],
})
export class PqrsModule {}
