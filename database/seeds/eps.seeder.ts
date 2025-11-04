import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EpsEntity } from '../../src/common/entities/eps.entity';

export class EpsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(EpsEntity);

    const regs = [
      { id: 1, name: 'COMPENSAR EPS', nit: '860066942', cod: 'EPS008' },
      { id: 2, name: 'FAMISANAR', nit: '830003564', cod: 'EPS017' },
      {
        id: 3,
        name: 'NUEVA EPS SUBSIDIADO',
        nit: '900156264',
        cod: 'EPSS41',
      },
      {
        id: 4,
        name: 'NUEVA EPS CON MOVILIDAD',
        nit: '900156264',
        cod: 'EPS037',
      },
      { id: 5, name: 'SALUD TOTAL', nit: '800130907', cod: 'EPSS02' },
      { id: 6, name: 'EPS SANITAS', nit: '800251440', cod: 'EPS005' },
      { id: 7, name: 'EPS SURA', nit: '800088702', cod: 'EPS010' },
    ];

    for (const data of regs) {
      const eps = await repository.findOneBy({ id: data.id });

      if (!eps) {
        await repository.insert([data]);
      }
    }
  }
}
