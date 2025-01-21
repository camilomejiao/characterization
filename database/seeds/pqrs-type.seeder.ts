import { DataSource } from 'typeorm';
import { PqrsTypeEntity } from '../../src/common/entities/pqrs-type.entity';
import { Seeder } from 'typeorm-extension';

export class PqrsTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PqrsTypeEntity);

    const pqrsTypes = [
      {
        id: 1,
        name: 'Petición',
        description: 'Solicitud de información o servicios',
      },
      {
        id: 2,
        name: 'Queja',
        description: 'Expresión de inconformidad sobre un servicio',
      },
      {
        id: 3,
        name: 'Reclamo',
        description: 'Solicitud de corrección por una acción u omisión',
      },
      {
        id: 4,
        name: 'Sugerencia',
        description: 'Propuesta de mejora para un proceso o servicio',
      },
    ];

    for (const data of pqrsTypes) {
      const exists = await repository.findOneBy({ id: data.id });
      if (!exists) {
        await repository.insert([data]);
      }
    }
  }
}
