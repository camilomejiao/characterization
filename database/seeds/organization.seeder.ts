import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OrganizationEntity } from '../../src/common/entities/organization.entity';
import { DepartmentEntity } from '../../src/common/entities/department.entity';
import { MunicipalityEntity } from '../../src/common/entities/municipality.entity';

export class OrganizationSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(OrganizationEntity);
    const departmentRepository = dataSource.getRepository(DepartmentEntity);
    const municipalityRepository = dataSource.getRepository(MunicipalityEntity);

    // Crear departamentos
    const department1 = await departmentRepository.findOne({
      where: { id: 11 },
    });
    const department2 = await departmentRepository.findOne({
      where: { id: 25 },
    });
    const department3 = await departmentRepository.findOne({
      where: { id: 17 },
    });

    // Crear municipios
    const municipality1 = await municipalityRepository.findOne({
      where: { id: 149 },
    });
    const municipality2 = await municipalityRepository.findOne({
      where: { id: 526 },
    });
    const municipality3 = await municipalityRepository.findOne({
      where: { id: 326 },
    });

    const regs = [
      {
        id: 1,
        nit: '1014208665',
        name: 'Admin',
        address: 'Admin',
        active: 1,
        file_1: '',
        file_2: '',
        file_3: '',
        file_4: '',
        department: department1,
        municipality: municipality1,
      },
      {
        id: 2,
        nit: '12345',
        name: 'Alcaldia de Puerto Salgar',
        address: 'Puerto Salgar',
        active: 1,
        file_1: '',
        file_2: '',
        file_3: '',
        file_4: '',
        department: department2,
        municipality: municipality2,
      },
      {
        id: 3,
        nit: '123456',
        name: 'Alcaldia de La Dorada',
        address: 'La Dorada',
        active: 1,
        file_1: '',
        file_2: '',
        file_3: '',
        file_4: '',
        department: department3,
        municipality: municipality3,
      },
    ];

    for (const data of regs) {
      const organization = await repository.findOneBy({
        id: data.id,
      });

      if (!organization) {
        await repository.insert([data]);
      }
    }
  }
}
