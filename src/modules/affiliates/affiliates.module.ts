import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entity
import { AffiliatesEntity } from '../../common/entities/affiliate.entity';
import { DepartmentEntity } from '../../common/entities/department.entity';
import { MunicipalityEntity } from '../../common/entities/municipality.entity';
import { AffiliateTypeEntity } from '../../common/entities/affiliate-type.entity';
import { PopulationTypeEntity } from '../../common/entities/population-type.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { CommunityEntity } from '../../common/entities/community.entity';
import { DisabilityTypeEntity } from '../../common/entities/disability-type.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { GenderEntity } from '../../common/entities/gender.entity';
import { IdentificationTypeEntity } from '../../common/entities/identification-type.entity';
import { LevelEntity } from '../../common/entities/level.entity';
import { MembershipClassEntity } from '../../common/entities/membership-class.entity';
import { MethodologyEntity } from '../../common/entities/methodology.entity';
import { GroupSubgroupEntity } from '../../common/entities/group-subgroup.entity';

//Controller
import { AffiliatesController } from './adapters/input/affiliates.controller';

//Use Case
import { CreateAffiliateUsecase } from './domain/input-ports/use-cases/create-affiliate.usecase';
import { UpdateAffiliateUsecase } from './domain/input-ports/use-cases/update-affiliate.usecase';
import { GetAffiliateUsecase } from './domain/input-ports/use-cases/get-affiliate.usecase';
import { ValidateAndAssignRelationsUsecase } from './domain/input-ports/use-cases/validate-and-assign-relations.usecase';

//Repository
import { IAffiliateRepository } from './domain/output-ports/affiliate.repository';
import { AffiliateMysqlRepository } from './domain/output-ports/mysql/affiliate-mysql.repository';
import { IDepartmentRepository } from '../department-municipality/domain/output-ports/department.repository';
import { DepartmentMysqlRepository } from '../department-municipality/domain/output-ports/mysql/department-mysql.repository';
import { IMunicipalityRepository } from '../department-municipality/domain/output-ports/municipality.repository';
import { MunicipalityMysqlRepository } from '../department-municipality/domain/output-ports/mysql/municipality-mysql.repository';
import { IAffiliateTypeRepository } from '../common/domain/output-ports/affiliate-type.repository';
import { AffiliateTypeMysqlRepository } from '../common/domain/output-ports/mysql/affiliate-type-mysql.repository';
import { IPopulationTypeRepository } from '../common/domain/output-ports/population-type.repository';
import { PopulationTypeMysqlRepository } from '../common/domain/output-ports/mysql/population-type-mysql.repository';
import { IEpsRepository } from '../common/domain/output-ports/eps.repository';
import { EpsMysqlRepository } from '../common/domain/output-ports/mysql/eps-mysql.repository';
import { IAreaRepository } from '../common/domain/output-ports/area.repository';
import { AreaMysqlRepository } from '../common/domain/output-ports/mysql/area-mysql.repository';
import { ICommunityRepository } from '../common/domain/output-ports/community.repository';
import { CommunityMysqlRepository } from '../common/domain/output-ports/mysql/community-mysql.repository';
import { IDisabilityTypeRepository } from '../common/domain/output-ports/disability-type.repository';
import { DisabilityTypeMysqlRepository } from '../common/domain/output-ports/mysql/disability-type-mysql.repository';
import { IEthnicityRepository } from '../common/domain/output-ports/ethnicity.repository';
import { EthnicityMysqlRepository } from '../common/domain/output-ports/mysql/ethnicity-mysql.repository';
import { IGenderRepository } from '../common/domain/output-ports/gender.repository';
import { GenderMysqlRepository } from '../common/domain/output-ports/mysql/gender-mysql.repository';
import { IIdentificationTypeRepository } from '../common/domain/output-ports/identification-type.repository';
import { IdentificationTypeMysqlRepository } from '../common/domain/output-ports/mysql/identification-type-mysql.repository';
import { ILevelRepository } from '../common/domain/output-ports/level.repository';
import { LevelMysqlRepository } from '../common/domain/output-ports/mysql/level-mysql.repository';
import { IMembershipClassRepository } from '../common/domain/output-ports/membership-class.repository';
import { MembershipClassMysqlRepository } from '../common/domain/output-ports/mysql/membership-class-mysql.repository';
import { IMethodologyRepository } from '../common/domain/output-ports/methodology.repository';
import { MethodologyMysqlRepository } from '../common/domain/output-ports/mysql/methodology-mysql.repository';
import { IGroupSubgroupRespository } from '../common/domain/output-ports/group-subgroup.respository';
import { GroupSubgroupMysqlRespository } from '../common/domain/output-ports/mysql/group-subgroup-mysql.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AffiliatesEntity,
      DepartmentEntity,
      MunicipalityEntity,
      AffiliateTypeEntity,
      PopulationTypeEntity,
      EpsEntity,
      AreaEntity,
      CommunityEntity,
      DisabilityTypeEntity,
      EthnicityEntity,
      GenderEntity,
      IdentificationTypeEntity,
      LevelEntity,
      MembershipClassEntity,
      MethodologyEntity,
      GroupSubgroupEntity,
    ]),
  ],
  controllers: [AffiliatesController],
  providers: [
    CreateAffiliateUsecase,
    GetAffiliateUsecase,
    UpdateAffiliateUsecase,
    ValidateAndAssignRelationsUsecase,
    {
      provide: IAffiliateRepository,
      useClass: AffiliateMysqlRepository,
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
      provide: IAffiliateTypeRepository,
      useClass: AffiliateTypeMysqlRepository,
    },
    {
      provide: IPopulationTypeRepository,
      useClass: PopulationTypeMysqlRepository,
    },
    {
      provide: IEpsRepository,
      useClass: EpsMysqlRepository,
    },
    {
      provide: IAreaRepository,
      useClass: AreaMysqlRepository,
    },
    {
      provide: ICommunityRepository,
      useClass: CommunityMysqlRepository,
    },
    {
      provide: IDisabilityTypeRepository,
      useClass: DisabilityTypeMysqlRepository,
    },
    {
      provide: IEthnicityRepository,
      useClass: EthnicityMysqlRepository,
    },
    {
      provide: IGenderRepository,
      useClass: GenderMysqlRepository,
    },
    {
      provide: IIdentificationTypeRepository,
      useClass: IdentificationTypeMysqlRepository,
    },
    {
      provide: ILevelRepository,
      useClass: LevelMysqlRepository,
    },
    {
      provide: IMembershipClassRepository,
      useClass: MembershipClassMysqlRepository,
    },
    {
      provide: IMethodologyRepository,
      useClass: MethodologyMysqlRepository,
    },
    {
      provide: IGroupSubgroupRespository,
      useClass: GroupSubgroupMysqlRespository,
    },
  ],
  exports: [AffiliatesModule],
})
export class AffiliatesModule {}
