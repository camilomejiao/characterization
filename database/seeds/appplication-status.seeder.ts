import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { ApplicationStatusEntity } from '../../src/common/entities/application-status.entity';

export class AppplicationStatusSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ApplicationStatusEntity);

    const applicationStatuses = [
      {
        id: 1,
        name: 'En revisión',
        description: 'La solicitud está en proceso de revisión',
      },
      { id: 2, name: 'Aprobado', description: 'La solicitud ha sido aprobada' },
      {
        id: 3,
        name: 'Rechazado',
        description: 'La solicitud ha sido rechazada',
      },
      { id: 4, name: 'Cerrado', description: 'La solicitud ha sido cerrada' },
    ];

    for (const status of applicationStatuses) {
      const exists = await repository.findOneBy({ id: status.id });
      if (!exists) {
        await repository.insert([status]);
      }
    }
  }
}
