import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { System_usersEntity } from '../../src/common/entities/system_users.entity';
import { RoleEntity } from '../../src/common/entities/role.entity';
import { OrganizationEntity } from '../../src/common/entities/organization.entity';

export class System_userSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(System_usersEntity);
    const organizationRepository = dataSource.getRepository(OrganizationEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);

    //Crear organizaciones
    const organization1 = await organizationRepository.findOne({
      where: { id: 1 },
    });

    const organization2 = await organizationRepository.findOne({
      where: { id: 2 },
    });

    // Crear roles
    const superAdminRole = await roleRepository.findOne({ where: { id: 1 } });
    const adminRole = await roleRepository.findOne({ where: { id: 2 } });
    const userRole = await roleRepository.findOne({ where: { id: 3 } });

    const regs = [
      {
        id: 1,
        name: 'Super Administrador',
        email: 'cmejia@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organization: organization1,
        active: 1,
        role: superAdminRole,
      },
      {
        id: 2,
        name: 'Administrador',
        email: 'cmejia1@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organization: organization2,
        active: 1,
        role: adminRole,
      },
      {
        id: 3,
        name: 'PQRS',
        email: 'pqrs@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organization: organization2,
        active: 1,
        role: userRole,
      },
      {
        id: 4,
        name: 'affiliates',
        email: 'affiliates@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organization: organization2,
        active: 1,
        role: userRole,
      },
      {
        id: 5,
        name: 'AUDITOR',
        email: 'auditor@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organization: organization2,
        active: 1,
        role: userRole,
      },
    ];

    for (const data of regs) {
      const users = await repository.findOneBy({
        id: data.id,
        email: data.email,
      });

      if (!users) {
        await repository.insert([data]);
      }
    }
  }
}
