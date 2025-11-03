import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

//Entity
import { RoleEntity } from '../../../../common/entities/role.entity';
import { System_usersEntity } from '../../../../common/entities/system_users.entity';
import { DepartmentEntity } from '../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';
import { Identification_typeEntity } from '../../../../common/entities/identification_type.entity';
import { EpsEntity } from '../../../../common/entities/eps.entity';
import { GenderEntity } from '../../../../common/entities/gender.entity';
import { AreaEntity } from '../../../../common/entities/area.entity';
import { Affiliate_typeEntity } from '../../../../common/entities/affiliate_type.entity';
import { Disability_typeEntity } from '../../../../common/entities/disability_type.entity';
import { MethodologyEntity } from '../../../../common/entities/methodology.entity';
import { LevelEntity } from '../../../../common/entities/level.entity';
import { Group_subgroupEntity } from '../../../../common/entities/group_subgroup.entity';
import { Membership_classEntity } from '../../../../common/entities/membership_class.entity';
import { Population_typeEntity } from '../../../../common/entities/population_type.entity';
import { EthnicityEntity } from '../../../../common/entities/ethnicity.entity';
import { CommunityEntity } from '../../../../common/entities/community.entity';
import { AffiliatesEntity } from '../../../../common/entities/affiliate.entity';
import { Application_statusEntity } from '../../../../common/entities/application_status.entity';
import { Pqrs_typeEntity } from '../../../../common/entities/pqrs_type.entity';
import { PqrsEntity } from '../../../../common/entities/pqrs.entity';
import { Reason_pqrsEntity } from '../../../../common/entities/reason_pqrs.entity';
import { UserEntity } from '../../../../common/entities/user.entity';
import { Pqrs_notificationEntity } from '../../../../common/entities/pqrs_notification.entity';
import { Affiliated_stateEntity } from '../../../../common/entities/affiliated_state.entity';
import { CountryEntity } from '../../../../common/entities/country.entity';
import { SexEntity } from '../../../../common/entities/sex.entity';
import { Ips_primaryEntity } from '../../../../common/entities/ips_primary.entity';
import { Ips_dentalEntity } from '../../../../common/entities/ips_dental.entity';
import { RegimeEntity } from '../../../../common/entities/regime.entity';
import { LMAEntity } from '../../../../common/entities/lma.entity';
import { Affiliate_historyEntity } from '../../../../common/entities/affiliate_history.entity';
import { SpecialPopulationEntity } from '../../../../common/entities/special_population.entity';
import { OrganizationEntity } from '../../../../common/entities/organization.entity';
import { UploadedFilesEntity } from '../../../../common/entities/uploaded_files.entity';

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
        OrganizationEntity,
        System_usersEntity,
        RoleEntity,
        RegimeEntity,
        DepartmentEntity,
        MunicipalityEntity,
        Identification_typeEntity,
        EpsEntity,
        SexEntity,
        GenderEntity,
        AreaEntity,
        Affiliate_typeEntity,
        Disability_typeEntity,
        MethodologyEntity,
        LevelEntity,
        Group_subgroupEntity,
        Membership_classEntity,
        Population_typeEntity,
        EthnicityEntity,
        CommunityEntity,
        Application_statusEntity,
        Pqrs_typeEntity,
        Reason_pqrsEntity,
        UserEntity,
        AffiliatesEntity,
        PqrsEntity,
        Pqrs_notificationEntity,
        Affiliated_stateEntity,
        CountryEntity,
        Ips_primaryEntity,
        Ips_dentalEntity,
        LMAEntity,
        Affiliate_historyEntity,
        SpecialPopulationEntity,
        UploadedFilesEntity,
      ],
      synchronize: false,
      //logging: true,
    };
  }
}
