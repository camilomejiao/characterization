import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Affiliated_stateEntity } from '../../src/common/entities/affiliated_state.entity';

export class AffiliatedStateSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Affiliated_stateEntity);

    const regs = [
      { id: 1, cod: 'AC', description: 'ACTIVO' },
      { id: 2, cod: 'AF', description: 'FALLECIDO' },
      { id: 3, cod: 'RE', description: 'RETIRADO' },
    ];

    for (const data of regs) {
      const state = await repository.findOneBy({ id: data.id });

      if (!state) {
        await repository.insert([data]);
      }
    }
  }
}
