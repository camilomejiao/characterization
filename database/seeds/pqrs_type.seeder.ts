import { DataSource } from 'typeorm';
import { Pqrs_typeEntity } from '../../src/common/entities/pqrs_type.entity';
import { Seeder } from 'typeorm-extension';

export class Pqrs_typeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Pqrs_typeEntity);

    const pqrsTypes = [
      {
        id: 1,
        name: 'PETICIÓN',
        description: 'Solicitud de información o servicios',
      },
      {
        id: 2,
        name: 'QUEJA',
        description: 'Expresión de inconformidad sobre un servicio',
      },
      {
        id: 3,
        name: 'RECLAMO',
        description: 'Solicitud de corrección por una acción u omisión',
      },
      {
        id: 3,
        name: 'SUGERENCIA',
        description: 'Solicitud de corrección por una acción u omisión',
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
