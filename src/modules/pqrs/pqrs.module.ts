import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controller
import { PqrsController } from './adapter/input/pqrs.controller';

//Entity
import { Pqrs_typeEntity } from '../../common/entities/pqrs_type.entity';
import { Application_statusEntity } from '../../common/entities/application_status.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { PqrsEntity } from '../../common/entities/pqrs.entity';
import { Reason_pqrsEntity } from '../../common/entities/reason_pqrs.entity';
import { UserEntity } from '../../common/entities/user.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { Pqrs_notificationEntity } from '../../common/entities/pqrs_notification.entity';

//Use case
import { Create_pqrsUsecase } from './domain/input-ports/usecase/create_pqrs.usecase';
import { Get_pqrs_by_documentUsecase } from './domain/input-ports/usecase/get_pqrs_by_document.usecase';
import { Update_pqrsUsecase } from './domain/input-ports/usecase/update_pqrs.usecase';
import { Validate_and_assign_relationsUsecase } from './domain/input-ports/usecase/validate_and_assign_relations.usecase';
import { Get_pqrsUsecase } from './domain/input-ports/usecase/get_pqrs.usecase';
import { Delete_pqrsUsecase } from './domain/input-ports/usecase/delete_pqrs.usecase';

//Interface
import { IPqrsRepository } from './domain/output-ports/pqrs.repository';
import { IPqrsTypeRepository } from '../common/domain/output-ports/pqrs_type.repository';
import { IApplicationStatusRepository } from '../common/domain/output-ports/application_status.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { IReasonPqrsRepository } from '../common/domain/output-ports/reason_pqrs.repository';
import { IUserRepository } from '../users/domain/output-ports/user.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { INotificationPrqsRepository } from './domain/output-ports/notification_prqs.repository';
import { IFileSigningPortRepository } from './domain/output-ports/s3/file-signing.port.repository';

//Repository
import { Pqrs_mysqlRepository } from './domain/output-ports/mysql/pqrs_mysql.repository';
import { Pqrs_type_mysqlRepository } from '../common/domain/output-ports/mysql/pqrs_type_mysql.repository';
import { Application_status_mysqlRepository } from '../common/domain/output-ports/mysql/application_status_mysql.repository';
import { Department_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/department_mysql.repository';
import { Municipality_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality_mysql.repository';
import { Reason_pqrs_mysqlRepository } from '../common/domain/output-ports/mysql/reason_pqrs_mysql.repository';
import { User_mysqlRepository } from '../users/domain/output-ports/mysql/user_mysql.repository';
import { Eps_mysqlRepository } from '../common/domain/output-ports/mysql/eps_mysql.repository';
import { Create_notification_pqrsUsecase } from './domain/input-ports/usecase/create_notification_pqrs.usecase';
import { Notification_prqs_mysqlRepository } from './domain/output-ports/mysql/notification_prqs_mysql.repository';
import { GetPqrsDetailByIdUsecase } from './domain/input-ports/usecase/get-pqrs-detail-by-id.usecase';

//Adapter
import { S3FileStorageAdapter } from './adapter/output/s3/s3-file-storage.adapter';
import { GetPqrExcelReportUsecase } from './domain/input-ports/usecase/get-pqr-excelReport.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PqrsEntity,
      Pqrs_typeEntity,
      Application_statusEntity,
      DepartmentEntity,
      MunicipalityEntity,
      Reason_pqrsEntity,
      UserEntity,
      EpsEntity,
      Pqrs_notificationEntity,
    ]),
  ],
  controllers: [PqrsController],
  providers: [
    Create_pqrsUsecase,
    GetPqrsDetailByIdUsecase,
    Get_pqrsUsecase,
    Get_pqrs_by_documentUsecase,
    Update_pqrsUsecase,
    Validate_and_assign_relationsUsecase,
    Create_notification_pqrsUsecase,
    Delete_pqrsUsecase,
    GetPqrExcelReportUsecase,
    {
      provide: IPqrsRepository,
      useClass: Pqrs_mysqlRepository,
    },
    {
      provide: IPqrsTypeRepository,
      useClass: Pqrs_type_mysqlRepository,
    },
    {
      provide: IApplicationStatusRepository,
      useClass: Application_status_mysqlRepository,
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
      provide: IReasonPqrsRepository,
      useClass: Reason_pqrs_mysqlRepository,
    },
    {
      provide: IEpsRepository,
      useClass: Eps_mysqlRepository,
    },
    {
      provide: IUserRepository,
      useClass: User_mysqlRepository,
    },
    {
      provide: INotificationPrqsRepository,
      useClass: Notification_prqs_mysqlRepository,
    },
    {
      provide: IFileSigningPortRepository,
      useClass: S3FileStorageAdapter,
    },
  ],
  exports: [PqrsModule],
})
export class PqrsModule {}
