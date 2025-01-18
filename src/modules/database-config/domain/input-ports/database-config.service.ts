import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

//Entity
import { RoleEntity } from '../../../../common/entities/role.entity';
import { SystemUsers } from '../../../../common/entities/system-users.entity';
import { DepartmentEntity } from '../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';
import { IdentificationTypeEntity } from '../../../../common/entities/identification-type.entity';
import { EpsEntity } from '../../../../common/entities/eps.entity';
import { GenderEntity } from '../../../../common/entities/gender.entity';
import { AreaEntity } from '../../../../common/entities/area.entity';
import { AffiliateTypeEntity } from '../../../../common/entities/affiliate-type.entity';
import { DisabilityTypeEntity } from '../../../../common/entities/disability-type.entity';
import { MethodologyEntity } from '../../../../common/entities/methodology.entity';
import { LevelEntity } from '../../../../common/entities/level.entity';
import { GroupSubgroupEntity } from '../../../../common/entities/group-subgroup.entity';
import { MembershipClassEntity } from '../../../../common/entities/membership-class.entity';
import { PopulationTypeEntity } from '../../../../common/entities/population-type.entity';
import { EthnicityEntity } from '../../../../common/entities/ethnicity.entity';
import { CommunityEntity } from '../../../../common/entities/community.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> {
    const host = this.configService.get<string>('databases.host');
    const port = this.configService.get<number>('databases.port');
    const database = this.configService.get<string>('databases.main');
    const username = this.configService.get<string>('databases.username');
    const password = this.configService.get<string>('databases.password');
    console.log(host, port, database, username, password);

    return {
      name: connectionName || 'characterization',
      type: 'mysql',
      host,
      port,
      database,
      username,
      password,
      entities: [
        SystemUsers,
        RoleEntity,
        DepartmentEntity,
        MunicipalityEntity,
        IdentificationTypeEntity,
        EpsEntity,
        GenderEntity,
        AreaEntity,
        AffiliateTypeEntity,
        DisabilityTypeEntity,
        MethodologyEntity,
        LevelEntity,
        GroupSubgroupEntity,
        MembershipClassEntity,
        PopulationTypeEntity,
        EthnicityEntity,
        CommunityEntity,
      ],
      synchronize: false,
    };
  }
}
