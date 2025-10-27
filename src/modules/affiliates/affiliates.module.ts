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
import { CommunityEntity } from '../../common/entities/community.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { LevelEntity } from '../../common/entities/level.entity';
import { Membership_classEntity } from '../../common/entities/membership_class.entity';
import { MethodologyEntity } from '../../common/entities/methodology.entity';
import { Group_subgroupEntity } from '../../common/entities/group_subgroup.entity';
import { RegimeEntity } from '../../common/entities/regime.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';

//Controller
import { AffiliatesController } from './adapters/input/affiliates.controller';

//Use Case
import { Create_affiliateUsecase } from './domain/input-ports/use-cases/create_affiliate.usecase';
import { GetAffiliateListUsecase } from './domain/input-ports/use-cases/get-affiliate-list.usecase';
import { Get_affilate_by_idUsecase } from './domain/input-ports/use-cases/get_affilate_by_id.usecase';
import { Update_affiliateUsecase } from './domain/input-ports/use-cases/update_affiliate.usecase';
import { Get_affiliate_by_identifiactionUsecase } from './domain/input-ports/use-cases/get_affiliate_by_identifiaction.usecase';
import { Validate_and_assign_relationsUsecase } from './domain/input-ports/use-cases/validate_and_assign_relations.usecase';
import { Bulk_affiliateUsecase } from './domain/input-ports/use-cases/bulk_affiliate.usecase';

//Repository
import { IAffiliateRepository } from './domain/output-ports/affiliate.repository';
import { IAffiliateTypeRepository } from '../common/domain/output-ports/affiliate_type.repository';
import { IPopulationTypeRepository } from '../common/domain/output-ports/population_type.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { ICommunityRepository } from '../common/domain/output-ports/community.repository';
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

//Mysql
import { Affiliate_mysqlRepository } from './domain/output-ports/mysql/affiliate_mysql.repository';
import { Affiliate_type_mysqlRepository } from '../common/domain/output-ports/mysql/affiliate_type_mysql.repository';
import { Population_type_mysqlRepository } from '../common/domain/output-ports/mysql/population_type_mysql.repository';
import { Eps_mysqlRepository } from '../common/domain/output-ports/mysql/eps_mysql.repository';
import { Community_mysqlRepository } from '../common/domain/output-ports/mysql/community_mysql.repository';
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
      CommunityEntity,
      LevelEntity,
      Membership_classEntity,
      MethodologyEntity,
      Group_subgroupEntity,
      DepartmentEntity,
      MunicipalityEntity,
    ]),
    UsersModule,
  ],
  controllers: [AffiliatesController],
  providers: [
    Create_affiliateUsecase,
    GetAffiliateListUsecase,
    Get_affilate_by_idUsecase,
    Get_affiliate_by_identifiactionUsecase,
    Update_affiliateUsecase,
    Validate_and_assign_relationsUsecase,
    Bulk_affiliateUsecase,
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
      provide: ICommunityRepository,
      useClass: Community_mysqlRepository,
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
  ],
  exports: [AffiliatesModule],
})
export class AffiliatesModule {}
