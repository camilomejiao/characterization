import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Reason_pqrsEntity } from '../../src/common/entities/reason_pqrs.entity';

export class Reason_pqrsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Reason_pqrsEntity);

    const pqrsTypes = [
      {
        id: 1,
        name: 'AUTORIZACIONES DE PROCESOS DE SALUD',
      },
      {
        id: 2,
        name: 'ATENCIÓN AL CIUDADANO',
      },
      {
        id: 3,
        name: 'GESTIÓN DE ENTREGA DE MEDICAMENTOS',
      },
      {
        id: 4,
        name: 'REFERENCIA Y CONTRAREFERENCIA',
      },
      {
        id: 5,
        name: 'CITAS DE MEDICINA GENERAL',
      },
      {
        id: 6,
        name: 'CITAS DE MEDICINA ESPECIALIZADA',
      },
      {
        id: 7,
        name: 'AFILIACIONES',
      },
      {
        id: 8,
        name: 'VIATICOS',
      },
      {
        id: 9,
        name: 'PORTABILIDAD',
      },
      {
        id: 10,
        name: 'TRASLADO',
      },
      {
        id: 11,
        name: 'DERECHOS Y DEBERES',
      },
      {
        id: 12,
        name: 'CAMBIO DE IPS',
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
