import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SexEntity } from '../../src/common/entities/sex.entity';

export class SexSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(SexEntity);

    const regs = [
      { id: 1, name: 'Femenino', code: 'F' },
      { id: 2, name: 'Masculino', code: 'M' },
    ];

    for (const data of regs) {
      const sex = await repository.findOneBy({ id: data.id });

      if (!sex) {
        await repository.insert([data]);
      }
    }
  }
}
