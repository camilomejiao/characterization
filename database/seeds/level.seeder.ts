import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { LevelEntity } from '../../src/common/entities/level.entity';

export class LevelSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(LevelEntity);

    const regs = [
      { id: 1, name: 'Nivel 1' },
      { id: 2, name: 'Nivel 2' },
      { id: 3, name: 'D - Afiliado con contribución solidaria' },
      { id: 4, name: 'N' },
      { id: 5, name: 'Ninguno' },
    ];

    for (const data of regs) {
      const level = await repository.findOneBy({ id: data.id });

      if (!level) {
        await repository.insert([data]);
      }
    }
  }
}
