import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//
import { UsersModule } from '../users/users.module';

//Entity
import { UserEntity } from '../../common/entities/user.entity';
import { AffiliatesEntity } from '../../common/entities/affiliate.entity';
import { Affiliate_typeEntity } from '../../common/entities/affiliate_type.entity';
import { Population_typeEntity } from '../../common/entities/population_type.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { Ips_primaryEntity } from '../../common/entities/ips_primary.entity';
import { Ips_dentalEntity } from '../../common/entities/ips_dental.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { LevelEntity } from '../../common/entities/level.entity';
import { Membership_classEntity } from '../../common/entities/membership_class.entity';
import { MethodologyEntity } from '../../common/entities/methodology.entity';
import { Group_subgroupEntity } from '../../common/entities/group_subgroup.entity';
import { RegimeEntity } from '../../common/entities/regime.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { LMAEntity } from '../../common/entities/lma.entity';
import { Affiliate_historyEntity } from '../../common/entities/affiliate_history.entity';
import { UploadedFilesEntity } from '../../common/entities/uploaded_files.entity';
import { CountryEntity } from '../../common/entities/country.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { SexEntity } from '../../common/entities/sex.entity';
import { Affiliated_stateEntity } from '../../common/entities/affiliated_state.entity';
import { Application_statusEntity } from '../../common/entities/application_status.entity';

//Controller
import { AffiliatesController } from './adapters/input/affiliates.controller';

//Use Case
import { Create_affiliateUsecase } from './domain/input-ports/use-cases/create_affiliate.usecase';
import { GetAffiliateListUsecase } from './domain/input-ports/use-cases/get-affiliate-list.usecase';
import { Get_affilate_by_idUsecase } from './domain/input-ports/use-cases/get_affilate_by_id.usecase';
import { Update_affiliateUsecase } from './domain/input-ports/use-cases/update_affiliate.usecase';
import { Validate_and_assign_relationsUsecase } from './domain/input-ports/use-cases/validate_and_assign_relations.usecase';
import { GetAffiliateInformationUsecase } from './domain/input-ports/use-cases/get_affiliate_information.usecase';
import { BulkAffiliateUsecase } from './domain/input-ports/use-cases/bulk/bulk_affiliate_usecase';
import { ValidateFileNameUsecase } from './domain/input-ports/use-cases/bulk/validate_file_name.usecase';
import { ValidateMonthlyUploadsUsecase } from './domain/input-ports/use-cases/bulk/validate_monthly_uploads.usecase';
import { ValidateDiffUserUsecase } from './domain/input-ports/use-cases/bulk/validate_diff_user.usecase';
import { ValidateDiffAffiliateUsecase } from './domain/input-ports/use-cases/bulk/validate_diff_affiliate.usecase';
import { LmaUsecase } from './domain/input-ports/use-cases/bulk/lma.usecase';
import { AffiliateHistoryUsecase } from './domain/input-ports/use-cases/bulk/affiliate_history.usecase';
import { UpsertUploadFileUsecase } from './domain/input-ports/use-cases/bulk/upsert_upload_file.usecase';

//Repository
import { IAffiliateRepository } from './domain/output-ports/affiliate.repository';
import { IAffiliateTypeRepository } from '../common/domain/output-ports/affiliate_type.repository';
import { IPopulationTypeRepository } from '../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { IEthnicityRepository } from '../common/domain/output-ports/ethnicity.repository';
import { ILevelRepository } from '../common/domain/output-ports/level.repository';
import { IMembershipClassRepository } from '../common/domain/output-ports/membership_class.repository';
import { IMethodologyRepository } from '../common/domain/output-ports/methodology.repository';
import { IGroupSubgroupRespository } from '../common/domain/output-ports/group_subgroup.respository';
import { IUserRepository } from '../users/domain/output-ports/user.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { IRegimeRepository } from '../common/domain/output-ports/regime.repository';
import { IIps_primaryRepository } from '../common/domain/output-ports/ips_primary.repository';
import { IIps_dentalRepository } from '../common/domain/output-ports/ips_dental.repository';
import { ICountryRepository } from '../common/domain/output-ports/country.repository';
import { IAreaRepository } from '../common/domain/output-ports/area.repository';
import { ISexRepository } from '../common/domain/output-ports/sex.repository';
import { IAffiliatedStateRepository } from '../common/domain/output-ports/affiliated_state.repository';
import { IApplicationStatusRepository } from '../common/domain/output-ports/application_status.repository';

//Mysql
import { Affiliate_mysqlRepository } from './domain/output-ports/mysql/affiliate_mysql.repository';
import { Affiliate_type_mysqlRepository } from '../common/domain/output-ports/mysql/affiliate_type_mysql.repository';
import { Population_type_mysqlRepository } from '../common/domain/output-ports/mysql/population_type_mysql.repository';
import { Eps_mysqlRepository } from '../common/domain/output-ports/mysql/eps_mysql.repository';
import { Ethnicity_mysqlRepository } from '../common/domain/output-ports/mysql/ethnicity_mysql.repository';
import { Level_mysqlRepository } from '../common/domain/output-ports/mysql/level_mysql.repository';
import { Membership_class_mysqlRepository } from '../common/domain/output-ports/mysql/membership_class_mysql.repository';
import { Methodology_mysqlRepository } from '../common/domain/output-ports/mysql/methodology_mysql.repository';
import { Group_subgroup_mysqlRespository } from '../common/domain/output-ports/mysql/group_subgroup_mysql.respository';
import { User_mysqlRepository } from '../users/domain/output-ports/mysql/user_mysql.repository';
import { Department_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/department_mysql.repository';
import { Municipality_mysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality_mysql.repository';
import { RegimeMysqlRepository } from '../common/domain/output-ports/mysql/regime_mysql.repository';
import { IpsPrimaryMysqlRepository } from '../common/domain/output-ports/mysql/ips_primary_mysql.repository';
import { IpsDentalMysqlRepository } from '../common/domain/output-ports/mysql/ips_dental_mysql.repository';
import { Country_mysqlRepository } from '../common/domain/output-ports/mysql/country_mysql.repository';
import { Area_mysqlRepository } from '../common/domain/output-ports/mysql/area_mysql.repository';
import { Sex_mysqlRepository } from '../common/domain/output-ports/mysql/sex_mysql.repository';
import { AffiliatedStateMysqlRepository } from '../common/domain/output-ports/mysql/affiliated_state_mysql.repository';
import { Application_status_mysqlRepository } from '../common/domain/output-ports/mysql/application_status_mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AffiliatesEntity,
      UserEntity,
      RegimeEntity,
      Affiliate_typeEntity,
      Population_typeEntity,
      EpsEntity,
      Ips_primaryEntity,
      Ips_dentalEntity,
      EthnicityEntity,
      LevelEntity,
      Membership_classEntity,
      MethodologyEntity,
      Group_subgroupEntity,
      DepartmentEntity,
      MunicipalityEntity,
      LMAEntity,
      Affiliate_historyEntity,
      UploadedFilesEntity,
      CountryEntity,
      AreaEntity,
      SexEntity,
      Affiliated_stateEntity,
      Application_statusEntity,
    ]),
    UsersModule,
  ],
  controllers: [AffiliatesController],
  providers: [
    Create_affiliateUsecase,
    GetAffiliateListUsecase,
    Get_affilate_by_idUsecase,
    Update_affiliateUsecase,
    Validate_and_assign_relationsUsecase,
    GetAffiliateInformationUsecase,
    BulkAffiliateUsecase,
    ValidateFileNameUsecase,
    ValidateMonthlyUploadsUsecase,
    ValidateDiffUserUsecase,
    ValidateDiffAffiliateUsecase,
    LmaUsecase,
    AffiliateHistoryUsecase,
    UpsertUploadFileUsecase,
    {
      provide: IAffiliateRepository,
      useClass: Affiliate_mysqlRepository,
    },
    {
      provide: IUserRepository,
      useClass: User_mysqlRepository,
    },
    {
      provide: IRegimeRepository,
      useClass: RegimeMysqlRepository,
    },
    {
      provide: IAffiliateTypeRepository,
      useClass: Affiliate_type_mysqlRepository,
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
      provide: IIps_primaryRepository,
      useClass: IpsPrimaryMysqlRepository,
    },
    {
      provide: IIps_dentalRepository,
      useClass: IpsDentalMysqlRepository,
    },
    {
      provide: IEthnicityRepository,
      useClass: Ethnicity_mysqlRepository,
    },
    {
      provide: ILevelRepository,
      useClass: Level_mysqlRepository,
    },
    {
      provide: IMembershipClassRepository,
      useClass: Membership_class_mysqlRepository,
    },
    {
      provide: IMethodologyRepository,
      useClass: Methodology_mysqlRepository,
    },
    {
      provide: IGroupSubgroupRespository,
      useClass: Group_subgroup_mysqlRespository,
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
      provide: ICountryRepository,
      useClass: Country_mysqlRepository,
    },
    {
      provide: IAreaRepository,
      useClass: Area_mysqlRepository,
    },
    {
      provide: ISexRepository,
      useClass: Sex_mysqlRepository,
    },
    {
      provide: IAffiliatedStateRepository,
      useClass: AffiliatedStateMysqlRepository,
    },
    {
      provide: IApplicationStatusRepository,
      useClass: Application_status_mysqlRepository,
    },
  ],
  exports: [AffiliatesModule],
})
export class AffiliatesModule {}
