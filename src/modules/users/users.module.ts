import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controller
import { UserController } from './adapters/input/user.controller';

//Entity
import { UserEntity } from '../../common/entities/user.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { SexEntity } from '../../common/entities/sex.entity';
import { Identification_typeEntity } from '../../common/entities/identification_type.entity';
import { Disability_typeEntity } from '../../common/entities/disability_type.entity';
import { CountryEntity } from '../../common/entities/country.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';

//Use Case
import { Create_userUsecase } from './domain/input-ports/use-cases/create_user.usecase';
import { Delete_userUsecase } from './domain/input-ports/use-cases/delete_user.usecase';
import { Get_userUsecase } from './domain/input-ports/use-cases/get_user.usecase';
import { Update_userUsecase } from './domain/input-ports/use-cases/update_user.usecase';

//Interface
import { IUserRepository } from './domain/output-ports/user.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { IIdentificationTypeRepository } from '../common/domain/output-ports/identification_type.repository';
import { IDisabilityTypeRepository } from '../common/domain/output-ports/disability_type.repository';
import { ISexRepository } from '../common/domain/output-ports/sex.repository';
import { IAreaRepository } from '../common/domain/output-ports/area.repository';
import { ICountryRepository } from '../common/domain/output-ports/country.repository';
import { IEthnicityRepository } from '../common/domain/output-ports/ethnicity.repository';

//Repository
import { User_mysqlRepository } from './domain/output-ports/mysql/user_mysql.repository';
import { Department_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/department_mysql.repository';
import { Municipality_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality_mysql.repository';
import { Identification_type_mysqlRepository } from '../common/domain/output-ports/mysql/identification_type_mysql.repository';
import { Disability_type_mysqlRepository } from '../common/domain/output-ports/mysql/disability_type_mysql.repository';
import { Sex_mysqlRepository } from '../common/domain/output-ports/mysql/sex_mysql.repository';
import { Area_mysqlRepository } from '../common/domain/output-ports/mysql/area_mysql.repository';
import { Country_mysqlRepository } from '../common/domain/output-ports/mysql/country_mysql.repository';
import { Ethnicity_mysqlRepository } from '../common/domain/output-ports/mysql/ethnicity_mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DepartmentEntity,
      MunicipalityEntity,
      AreaEntity,
      SexEntity,
      Identification_typeEntity,
      Disability_typeEntity,
      CountryEntity,
      EthnicityEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    Create_userUsecase,
    Update_userUsecase,
    Delete_userUsecase,
    Get_userUsecase,
    {
      provide: IUserRepository,
      useClass: User_mysqlRepository,
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
      provide: IIdentificationTypeRepository,
      useClass: Identification_type_mysqlRepository,
    },
    {
      provide: IDisabilityTypeRepository,
      useClass: Disability_type_mysqlRepository,
    },
    {
      provide: ISexRepository,
      useClass: Sex_mysqlRepository,
    },
    {
      provide: IAreaRepository,
      useClass: Area_mysqlRepository,
    },
    {
      provide: ICountryRepository,
      useClass: Country_mysqlRepository,
    },
    {
      provide: IEthnicityRepository,
      useClass: Ethnicity_mysqlRepository,
    },
  ],
  exports: [UsersModule],
})
export class UsersModule {}
