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
import { ReasonPqrsEntity } from '../../common/entities/reason-pqrs.entity';
import { GroupSubgroupEntity } from '../../common/entities/group-subgroup.entity';
import { PqrsTypeEntity } from '../../common/entities/pqrs-type.entity';
import { ApplicationStatusEntity } from '../../common/entities/application-status.entity';
import { AffiliatedStateEntity } from '../../common/entities/affiliated-state.entity';
import { CountryEntity } from "../../common/entities/country.entity";

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
import { ReasonPqrsController } from './adapters/input/reason-pqrs.controller';
import { PqrsTypeController } from './adapters/input/pqrs-type.controller';
import { ApplicationStatusController } from './adapters/input/application-status.controller';
import { GroupSubgroupController } from './adapters/input/group-subgroup.controller';
import { AffiliatedStateController } from './adapters/input/affiliated-state.controller';
import { CountryController } from "./adapters/input/country.controller";

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
      ReasonPqrsEntity,
      AffiliatedStateEntity,
      CountryEntity,
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
    ReasonPqrsController,
    AffiliatedStateController,
    CountryController,
  ],
  providers: [],
  exports: [CommonModule],
})
export class CommonModule {}
