import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { LevelEntity } from '../../src/common/entities/level.entity';

export class LevelSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(LevelEntity);

    const regs = [
      { id: 1, name: 'Afiliado sin encuesta SISBEN' },
      { id: 2, name: 'Afiliado con contribución solidaria' },
      { id: 3, name: 'Nivel I' },
      { id: 4, name: 'Nivel II' },
    ];

    for (const data of regs) {
      const level = await repository.findOneBy({ id: data.id });

      if (!level) {
        await repository.insert([data]);
      }
    }
  }
}
