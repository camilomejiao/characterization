import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { AffiliateTypeEntity } from '../../common/entities/affiliate-type.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { CommunityEntity } from '../../common/entities/community.entity';
import { DisabilityTypeEntity } from '../../common/entities/disability-type.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { GenderEntity } from '../../common/entities/gender.entity';
import { IdentificationTypeEntity } from '../../common/entities/identification-type.entity';
import { LevelEntity } from '../../common/entities/level.entity';
import { MembershipClassEntity } from '../../common/entities/membership-class.entity';
import { MethodologyEntity } from '../../common/entities/methodology.entity';
import { PopulationTypeEntity } from '../../common/entities/population-type.entity';

// Controllers
import { AffiliateTypeController } from './adapters/input/affiliate-type.controller';
import { AreaController } from './adapters/input/area.controller';
import { CommunityController } from './adapters/input/community.controller';
import { DisabilityTypeController } from './adapters/input/disability-type.controller';
import { EpsController } from './adapters/input/eps.controller';
import { EthnicityController } from './adapters/input/ethnicity.controller';
import { GenderController } from './adapters/input/gender.controller';
import { IdentificationTypeController } from './adapters/input/identification-type.controller';
import { LevelController } from './adapters/input/level.controller';
import { MembershipClassController } from './adapters/input/membership-class.controller';
import { MethodologyController } from './adapters/input/methodology.controller';
import { PopulationTypeController } from './adapters/input/population-type.controller';

// Repositories
import { IAffiliateTypeRepository } from './domain/output-ports/affiliate-type.repository';
import { AffiliateTypeMysqlRepository } from './domain/output-ports/mysql/affiliate-type-mysql.repository';
import { IAreaRepository } from './domain/output-ports/area.repository';
import { AreaMysqlRepository } from './domain/output-ports/mysql/area-mysql.repository';
import { ICommunityRepository } from './domain/output-ports/community.repository';
import { CommunityMysqlRepository } from './domain/output-ports/mysql/community-mysql.repository';
import { IDisabilityTypeRepository } from './domain/output-ports/disability-type.repository';
import { DisabilityTypeMysqlRepository } from './domain/output-ports/mysql/disability-type-mysql.repository';
import { IEpsRepository } from './domain/output-ports/eps.repository';
import { EpsMysqlRepository } from './domain/output-ports/mysql/eps-mysql.repository';
import { IEthnicityRepository } from './domain/output-ports/ethnicity.repository';
import { EthnicityMysqlRepository } from './domain/output-ports/mysql/ethnicity-mysql.repository';
import { IGenderRepository } from './domain/output-ports/gender.repository';
import { GenderMysqlRepository } from './domain/output-ports/mysql/gender-mysql.repository';
import { IIdentificationTypeRepository } from './domain/output-ports/identification-type.repository';
import { IdentificationTypeMysqlRepository } from './domain/output-ports/mysql/identification-type-mysql.repository';
import { ILevelRepository } from './domain/output-ports/level.repository';
import { LevelMysqlRepository } from './domain/output-ports/mysql/level-mysql.repository';
import { IMembershipClassRepository } from './domain/output-ports/membership-class.repository';
import { MembershipClassMysqlRepository } from './domain/output-ports/mysql/membership-class-mysql.repository';
import { IMethodologyRepository } from './domain/output-ports/methodology.repository';
import { MethodologyMysqlRepository } from './domain/output-ports/mysql/methodology-mysql.repository';
import { IPopulationTypeRepository } from './domain/output-ports/population-type.repository';
import { PopulationTypeMysqlRepository } from './domain/output-ports/mysql/population-type-mysql.repository';
import { PqrsTypeEntity } from '../../common/entities/pqrs-type.entity';
import { ApplicationStatusEntity } from '../../common/entities/application-status.entity';
import { PqrsTypeController } from './adapters/input/pqrs-type.controller';
import { ApplicationStatusController } from './adapters/input/application-status.controller';
import { GroupSubgroupController } from './adapters/input/group-subgroup.controller';
import { GroupSubgroupEntity } from '../../common/entities/group-subgroup.entity';
import { GroupSubgroupMysqlRespository } from './domain/output-ports/mysql/group-subgroup-mysql.respository';
import { IGroupSubgroupRespository } from './domain/output-ports/group-subgroup.respository';
import { PqrsTypeMysqlRepository } from './domain/output-ports/mysql/pqrs-type-mysql.repository';
import { ApplicationStatusMysqlRepository } from './domain/output-ports/mysql/application-status-mysql.repository';
import { IApplicationStatusRepository } from './domain/output-ports/application-status.repository';
import { IPqrsTypeRepository } from './domain/output-ports/pqrs-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AffiliateTypeEntity,
      AreaEntity,
      CommunityEntity,
      DisabilityTypeEntity,
      EpsEntity,
      EthnicityEntity,
      GenderEntity,
      GroupSubgroupEntity,
      IdentificationTypeEntity,
      LevelEntity,
      MembershipClassEntity,
      MethodologyEntity,
      PopulationTypeEntity,
      PqrsTypeEntity,
      ApplicationStatusEntity,
    ]),
  ],
  controllers: [
    AffiliateTypeController,
    AreaController,
    CommunityController,
    DisabilityTypeController,
    EpsController,
    EthnicityController,
    GenderController,
    GroupSubgroupController,
    IdentificationTypeController,
    LevelController,
    MembershipClassController,
    MethodologyController,
    PopulationTypeController,
    PqrsTypeController,
    ApplicationStatusController,
  ],
  providers: [
    {
      provide: IAffiliateTypeRepository,
      useClass: AffiliateTypeMysqlRepository,
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
      provide: IEpsRepository,
      useClass: EpsMysqlRepository,
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
      provide: IGroupSubgroupRespository,
      useClass: GroupSubgroupMysqlRespository,
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
      provide: IPopulationTypeRepository,
      useClass: PopulationTypeMysqlRepository,
    },
    {
      provide: IPqrsTypeRepository,
      useClass: PqrsTypeMysqlRepository,
    },
    {
      provide: IApplicationStatusRepository,
      useClass: ApplicationStatusMysqlRepository,
    },
  ],
  exports: [CommonModule],
})
export class CommonModule {}
