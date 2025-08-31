import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { ApplicationStatusEntity } from '../../src/common/entities/application-status.entity';

export class AppplicationStatusSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ApplicationStatusEntity);

    const applicationStatuses = [
      {
        id: 1,
        name: 'Abierto',
        description: 'Solicitud de información o servicios',
      },
      {
        id: 2,
        name: 'En seguimiento',
        description: 'Expresión de inconformidad sobre un servicio',
      },
      {
        id: 3,
        name: 'Cerrado',
        description: 'Solicitud de corrección por una acción u omisión',
      },
    ];

    for (const status of applicationStatuses) {
      const exists = await repository.findOneBy({ id: status.id });
      if (!exists) {
        await repository.insert([status]);
      }
    }
  }
}
