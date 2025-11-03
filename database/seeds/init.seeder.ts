import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import { RolesSeeder } from './role.seeder';
import { DepartmentSeeder } from './department.seeder';
import { MunicipalitySeeder } from './municipality.seeder';
import { System_userSeeder } from './system_user.seeder';
import { Identification_typeSeeder } from './identification_type.seeder';
import { EpsSeeder } from './eps.seeder';
import { SexSeeder } from './sex.seeder';
import { AreaSeeder } from './area.seeder';
import { AffiliateTypeSeeder } from './affiliate_type.seeder';
import { Disability_typeSeeder } from './disability_type.seeder';
import { MethodologySeeder } from './methodology.seeder';
import { LevelSeeder } from './level.seeder';
import { Group_subgroupSeeder } from './group_subgroup.seeder';
import { Membership_classSeeder } from './membership_class.seeder';
import { PopulationTypeSeeder } from './population-type.seeder';
import { EthnicitySeeder } from './ethnicity.seeder';
import { Pqrs_typeSeeder } from './pqrs_type.seeder';
import { Appplication_statusSeeder } from './appplication_status.seeder';
import { Reason_pqrsSeeder } from './reason_pqrs.seeder';
import { AffiliatedStateSeeder } from './affiliated-state.seeder';
import { CountrySeeder } from './country.seeder';
import { RegimeSeeder } from './regime.seeder';
import { IpsPrimarySeeder } from './ips_primary.seeder';
import { IpsDentalSeeder } from './ips_dental.seeder';
import { GenderSeeder } from './gender.seeder';
import { OrganizationSeeder } from './organization.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [
        RolesSeeder,
        RegimeSeeder,
        DepartmentSeeder,
        MunicipalitySeeder,
        OrganizationSeeder,
        Identification_typeSeeder,
        EpsSeeder,
        SexSeeder,
        GenderSeeder,
        IpsPrimarySeeder,
        IpsDentalSeeder,
        AreaSeeder,
        AffiliateTypeSeeder,
        Disability_typeSeeder,
        MethodologySeeder,
        LevelSeeder,
        Group_subgroupSeeder,
        Membership_classSeeder,
        PopulationTypeSeeder,
        EthnicitySeeder,
        System_userSeeder,
        Pqrs_typeSeeder,
        Appplication_statusSeeder,
        Reason_pqrsSeeder,
        AffiliatedStateSeeder,
        CountrySeeder,
      ],
    });
  }
}
