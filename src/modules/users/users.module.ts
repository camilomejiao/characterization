import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controller
import { UserController } from './adapters/input/user.controller';

//Entity
import { UserEntity } from '../../common/entities/user.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { GenderEntity } from '../../common/entities/gender.entity';
import { IdentificationTypeEntity } from '../../common/entities/identification-type.entity';
import { DisabilityTypeEntity } from '../../common/entities/disability-type.entity';

//Use Case
import { CreateUserUsecase } from './domain/input-ports/use-cases/create-user.usecase';
import { DeleteUserUsecase } from './domain/input-ports/use-cases/delete-user.usecase';
import { GetUserUsecase } from './domain/input-ports/use-cases/get-user.usecase';
import { UpdateUserUsecase } from './domain/input-ports/use-cases/update-user.usecase';
import { CountryEntity } from '../../common/entities/country.entity';

//Interface
import { IUserRepository } from './domain/output-ports/user.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { IIdentificationTypeRepository } from '../common/domain/output-ports/identification-type.repository';
import { IDisabilityTypeRepository } from '../common/domain/output-ports/disability-type.repository';
import { IGenderRepository } from '../common/domain/output-ports/gender.repository';
import { IAreaRepository } from '../common/domain/output-ports/area.repository';
import { ICountryRepository } from '../common/domain/output-ports/country.repository';

//Repository
import { UserMysqlRepository } from './domain/output-ports/mysql/user-mysql.repository';
import { DepartmentMysqlRepository } from '../department-municipality/domain/output-ports/mysql/department-mysql.repository';
import { MunicipalityMysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality-mysql.repository';
import { IdentificationTypeMysqlRepository } from '../common/domain/output-ports/mysql/identification-type-mysql.repository';
import { DisabilityTypeMysqlRepository } from '../common/domain/output-ports/mysql/disability-type-mysql.repository';
import { GenderMysqlRepository } from '../common/domain/output-ports/mysql/gender-mysql.repository';
import { AreaMysqlRepository } from '../common/domain/output-ports/mysql/area-mysql.repository';
import { CountryMysqlRepository } from '../common/domain/output-ports/mysql/country-mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DepartmentEntity,
      MunicipalityEntity,
      AreaEntity,
      GenderEntity,
      IdentificationTypeEntity,
      DisabilityTypeEntity,
      CountryEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    GetUserUsecase,
    {
      provide: IUserRepository,
      useClass: UserMysqlRepository,
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
      provide: IIdentificationTypeRepository,
      useClass: IdentificationTypeMysqlRepository,
    },
    {
      provide: IDisabilityTypeRepository,
      useClass: DisabilityTypeMysqlRepository,
    },
    {
      provide: IGenderRepository,
      useClass: GenderMysqlRepository,
    },
    {
      provide: IAreaRepository,
      useClass: AreaMysqlRepository,
    },
    {
      provide: ICountryRepository,
      useClass: CountryMysqlRepository,
    },
  ],
  exports: [UsersModule],
})
export class UsersModule {}
