import { DataSource } from 'typeorm';
import { MethodologyEntity } from '../../src/common/entities/methodology.entity';
import { Seeder } from 'typeorm-extension';

export class MethodologySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(MethodologyEntity);

    const regs = [
      { id: 1, name: 'Afiliacion de oficio' },
      { id: 2, name: 'Listados Censales' },
      { id: 3, name: 'Sisben IV' },
    ];

    for (const data of regs) {
      const area = await repository.findOneBy({ id: data.id });

      if (!area) {
        await repository.insert([data]);
      }
    }
  }
}
