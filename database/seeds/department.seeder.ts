import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DepartmentEntity } from '../../src/common/entities/department.entity';

export class DepartmentSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(DepartmentEntity);

    const regs = [
      { id: 5, name: 'Antioquia', code: 5 },
      { id: 8, name: 'Atlántico', code: 8 },
      { id: 11, name: 'Bogotá, D.C.', code: 11 },
      { id: 13, name: 'Bolívar', code: 13 },
      { id: 15, name: 'Boyacá', code: 15 },
      { id: 17, name: 'Caldas', code: 17 },
      { id: 18, name: 'Caquetá', code: 18 },
      { id: 19, name: 'Cauca', code: 19 },
      { id: 20, name: 'Cesar', code: 20 },
      { id: 23, name: 'Córdoba', code: 23 },
      { id: 25, name: 'Cundinamarca', code: 25 },
      { id: 27, name: 'Chocó', code: 27 },
      { id: 41, name: 'Huila', code: 41 },
      { id: 44, name: 'La Guajira', code: 44 },
      { id: 47, name: 'Magdalena', code: 47 },
      { id: 50, name: 'Meta', code: 50 },
      { id: 52, name: 'Nariño', code: 52 },
      { id: 54, name: 'Norte de Santander', code: 54 },
      { id: 63, name: 'Quindio', code: 63 },
      { id: 66, name: 'Risaralda', code: 66 },
      { id: 68, name: 'Santander', code: 68 },
      { id: 70, name: 'Sucre', code: 70 },
      { id: 73, name: 'Tolima', code: 73 },
      { id: 76, name: 'Valle del Cauca', code: 76 },
      { id: 81, name: 'Arauca', code: 81 },
      { id: 85, name: 'Casanare', code: 85 },
      { id: 86, name: 'Putumayo', code: 86 },
      {
        id: 88,
        name: 'Archipiélago de San Andrés, Providencia y Santa Catalina',
        code: 88,
      },
      { id: 91, name: 'Amazonas', code: 91 },
      { id: 94, name: 'Guainía', code: 94 },
      { id: 95, name: 'Guaviare', code: 95 },
      { id: 97, name: 'Vaupés', code: 97 },
      { id: 99, name: 'Vichada', code: 99 },
    ];

    for (const data of regs) {
      const department = await repository.findOneBy({ id: data.id });

      if (!department) {
        await repository.insert([data]);
      }
    }
  }
}
