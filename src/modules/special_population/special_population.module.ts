import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//
import { UsersModule } from '../users/users.module';

//Controller
import { SpecialPopulationController } from './adapters/input/special_population.controller';

//UseCase
import { CreateSpecialPopulationUsecase } from './domain/input-ports/use-case/create_special_population.usecase';
import { GetSpecialPopulationListUsecase } from './domain/input-ports/use-case/get_special_population_list.usecase';
import { GetSpecialPopulationUserByIdUsecase } from './domain/input-ports/use-case/get_special_population_user_by_id.usecase';
import { UpdateSpecialPopulationUsecase } from './domain/input-ports/use-case/update_special_population.usecase';
import { Validate_and_assign_relationsUsecase } from './domain/input-ports/use-case/validate_and_assign_relations.usecase';

//Entity
import { SpecialPopulationEntity } from '../../common/entities/special_population.entity';
import { UserEntity } from '../../common/entities/user.entity';
import { Population_typeEntity } from '../../common/entities/population_type.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { Application_statusEntity } from '../../common/entities/application_status.entity';

//Interface
import { ISpecialPopulationRepository } from './domain/output-ports/special_population.repository';
import { IUserRepository } from '../users/domain/output-ports/user.repository';
import { IPopulationTypeRepository } from '../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { IEthnicityRepository } from '../common/domain/output-ports/ethnicity.repository';
import { IApplicationStatusRepository } from '../common/domain/output-ports/application_status.repository';

//Repository
import { SpecialPopulationMysqlRepository } from './domain/output-ports/mysql/special_population_mysql.repository';
import { User_mysqlRepository } from '../users/domain/output-ports/mysql/user_mysql.repository';
import { Population_type_mysqlRepository } from '../common/domain/output-ports/mysql/population_type_mysql.repository';
import { Eps_mysqlRepository } from '../common/domain/output-ports/mysql/eps_mysql.repository';
import { Ethnicity_mysqlRepository } from '../common/domain/output-ports/mysql/ethnicity_mysql.repository';
import { Application_status_mysqlRepository } from '../common/domain/output-ports/mysql/application_status_mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecialPopulationEntity,
      UserEntity,
      Population_typeEntity,
      EpsEntity,
      EthnicityEntity,
      Application_statusEntity,
    ]),
    UsersModule,
  ],
  controllers: [SpecialPopulationController],
  providers: [
    CreateSpecialPopulationUsecase,
    GetSpecialPopulationListUsecase,
    GetSpecialPopulationUserByIdUsecase,
    UpdateSpecialPopulationUsecase,
    Validate_and_assign_relationsUsecase,
    {
      provide: ISpecialPopulationRepository,
      useClass: SpecialPopulationMysqlRepository,
    },
    {
      provide: IUserRepository,
      useClass: User_mysqlRepository,
    },
    {
      provide: IPopulationTypeRepository,
      useClass: Population_type_mysqlRepository,
    },
    {
      provide: IEpsRepository,
      useClass: Eps_mysqlRepository,
    },
    {
      provide: IEthnicityRepository,
      useClass: Ethnicity_mysqlRepository,
    },
    {
      provide: IApplicationStatusRepository,
      useClass: Application_status_mysqlRepository,
    },
  ],
  exports: [SpecialPopulationModule],
})
export class SpecialPopulationModule {}
