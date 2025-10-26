import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { System_usersEntity } from '../../src/common/entities/system_users.entity';
import { RoleEntity } from '../../src/common/entities/role.entity';
import { DepartmentEntity } from '../../src/common/entities/department.entity';
import { MunicipalityEntity } from '../../src/common/entities/municipality.entity';

export class System_userSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(System_usersEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const departmentRepository = dataSource.getRepository(DepartmentEntity);
    const municipalityRepository = dataSource.getRepository(MunicipalityEntity);

    // Crear roles
    const superAdminRole = await roleRepository.findOne({ where: { id: 1 } });
    const adminRole = await roleRepository.findOne({ where: { id: 2 } });
    const userRole = await roleRepository.findOne({ where: { id: 3 } });

    // Crear departamentos
    const department1 = await departmentRepository.findOne({
      where: { id: 11 },
    });
    const department2 = await departmentRepository.findOne({
      where: { id: 25 },
    });

    // Crear municipios
    const municipality1 = await municipalityRepository.findOne({
      where: { id: 149 },
    });
    const municipality2 = await municipalityRepository.findOne({
      where: { id: 526 },
    });

    const regs = [
      {
        id: 1,
        name: 'Super Administrador',
        email: 'cmejia@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organizationName: 'test',
        active: 1,
        role: superAdminRole,
        department: department1,
        municipality: municipality1,
      },
      {
        id: 2,
        name: 'Administrador',
        email: 'cmejia1@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organizationName: 'test',
        active: 1,
        role: adminRole,
        department: department1,
        municipality: municipality1,
      },
      {
        id: 3,
        name: 'Usuario prueba',
        email: 'user@gmail.com',
        password: await bcrypt.hash('Mon1014*', 10),
        organizationName: 'test 2',
        active: 1,
        role: userRole,
        department: department2,
        municipality: municipality2,
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
