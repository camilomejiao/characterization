import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { RolesSeeder } from './role.seeder';
import { DepartmentSeeder } from './department.seeder';
import { MunicipalitySeeder } from './municipality.seeder';
import { System_userSeeder } from './system_user.seeder';
import { IdentificationTypeSeeder } from './identification-type.seeder';
import { EpsSeeder } from './eps.seeder';
import { GenderSeeder } from './gender.seeder';
import { AreaSeeder } from './area.seeder';
import { AffiliateTypeSeeder } from './affiliate_type.seeder';
import { DisabilityTypeSeeder } from './disability-type.seeder';
import { MethodologySeeder } from './methodology.seeder';
import { LevelSeeder } from './level.seeder';
import { GroupSubgroupSeeder } from './group-subgroup.seeder';
import { MembershipClassSeeder } from './membership-class.seeder';
import { PopulationTypeSeeder } from './population-type.seeder';
import { EthnicitySeeder } from './ethnicity.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [
        RolesSeeder,
        DepartmentSeeder,
        MunicipalitySeeder,
        IdentificationTypeSeeder,
        EpsSeeder,
        GenderSeeder,
        AreaSeeder,
        AffiliateTypeSeeder,
        DisabilityTypeSeeder,
        MethodologySeeder,
        LevelSeeder,
        GroupSubgroupSeeder,
        MembershipClassSeeder,
        PopulationTypeSeeder,
        EthnicitySeeder,
        System_userSeeder,
      ],
    });
  }
}
