import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AreaEntity } from '../../src/common/entities/area.entity';

export class AreaSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(AreaEntity);

    const regs = [
      { id: 1, name: 'Urbano', code: 'U' },
      { id: 2, name: 'Rural', code: 'R' },
      { id: 3, name: 'Rural Disperso', code: 'RD' },
      { id: 4, name: 'Centro Poblado', code: 'CP' },
      { id: 5, name: 'Cabecera Municipal', code: 'CM' },
    ];

    for (const data of regs) {
      const area = await repository.findOneBy({ id: data.id });

      if (!area) {
        await repository.insert([data]);
      }
    }
  }
}
