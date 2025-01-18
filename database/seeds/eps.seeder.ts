import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EpsEntity } from '../../src/common/entities/eps.entity';

export class EpsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(EpsEntity);

    const regs = [
      { id: 1, name: 'COMPENSAR', nit: '1323' },
      { id: 2, name: 'FAMISANAR', nit: '1324' },
      { id: 3, name: 'NUEVA EPS', nit: '1325' },
      { id: 4, name: 'SALUD TOTAL', nit: '1326' },
      { id: 5, name: 'SANITAS', nit: '1327' },
    ];

    for (const data of regs) {
      const eps = await repository.findOneBy({ id: data.id });

      if (!eps) {
        await repository.insert([data]);
      }
    }
  }
}
