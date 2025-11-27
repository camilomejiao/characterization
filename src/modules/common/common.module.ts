import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Affiliate_typeEntity } from '../../common/entities/affiliate_type.entity';
import { AreaEntity } from '../../common/entities/area.entity';
import { Disability_typeEntity } from '../../common/entities/disability_type.entity';
import { EpsEntity } from '../../common/entities/eps.entity';
import { EthnicityEntity } from '../../common/entities/ethnicity.entity';
import { SexEntity } from '../../common/entities/sex.entity';
import { Identification_typeEntity } from '../../common/entities/identification_type.entity';
import { LevelEntity } from '../../common/entities/level.entity';
import { Membership_classEntity } from '../../common/entities/membership_class.entity';
import { MethodologyEntity } from '../../common/entities/methodology.entity';
import { Population_typeEntity } from '../../common/entities/population_type.entity';
import { Reason_pqrsEntity } from '../../common/entities/reason_pqrs.entity';
import { Group_subgroupEntity } from '../../common/entities/group_subgroup.entity';
import { Pqrs_typeEntity } from '../../common/entities/pqrs_type.entity';
import { Application_statusEntity } from '../../common/entities/application_status.entity';
import { Affiliated_stateEntity } from '../../common/entities/affiliated_state.entity';
import { CountryEntity } from '../../common/entities/country.entity';
import { Ips_primaryEntity } from '../../common/entities/ips_primary.entity';
import { Ips_dentalEntity } from '../../common/entities/ips_dental.entity';
import { RegimeEntity } from '../../common/entities/regime.entity';
import { UploadedFilesEntity } from '../../common/entities/uploaded_files.entity';

// Controllers
import { Affiliate_typeController } from './adapters/input/affiliate_type.controller';
import { AreaController } from './adapters/input/area.controller';
import { Disability_typeController } from './adapters/input/disability_type.controller';
import { EpsController } from './adapters/input/eps.controller';
import { EthnicityController } from './adapters/input/ethnicity.controller';
import { SexController } from './adapters/input/sex.controller';
import { Identification_typeController } from './adapters/input/identification_type.controller';
import { LevelController } from './adapters/input/level.controller';
import { Membership_classController } from './adapters/input/membership_class.controller';
import { MethodologyController } from './adapters/input/methodology.controller';
import { Population_typeController } from './adapters/input/population_type.controller';
import { Reason_pqrsController } from './adapters/input/reason_pqrs.controller';
import { Pqrs_typeController } from './adapters/input/pqrs_type.controller';
import { Application_statusController } from './adapters/input/application_status.controller';
import { Group_subgroupController } from './adapters/input/group_subgroup.controller';
import { Affiliated_stateController } from './adapters/input/affiliated_state.controller';
import { CountryController } from './adapters/input/country.controller';
import { Ips_primaryController } from './adapters/input/ips_primary.controller';
import { Ips_dentalController } from './adapters/input/ips_dental.controller';
import { RegimeController } from './adapters/input/regime.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegimeEntity,
      Affiliate_typeEntity,
      AreaEntity,
      Disability_typeEntity,
      EpsEntity,
      EthnicityEntity,
      SexEntity,
      Group_subgroupEntity,
      Identification_typeEntity,
      LevelEntity,
      Membership_classEntity,
      MethodologyEntity,
      Population_typeEntity,
      Pqrs_typeEntity,
      Application_statusEntity,
      Reason_pqrsEntity,
      Affiliated_stateEntity,
      CountryEntity,
      Ips_primaryEntity,
      Ips_dentalEntity,
      UploadedFilesEntity,
    ]),
  ],
  controllers: [
    RegimeController,
    Affiliate_typeController,
    AreaController,
    Disability_typeController,
    EpsController,
    EthnicityController,
    SexController,
    Group_subgroupController,
    Identification_typeController,
    LevelController,
    Membership_classController,
    MethodologyController,
    Population_typeController,
    Pqrs_typeController,
    Application_statusController,
    Reason_pqrsController,
    Affiliated_stateController,
    CountryController,
    Ips_primaryController,
    Ips_dentalController,
  ],
  providers: [],
  exports: [CommonModule],
})
export class CommonModule {}
