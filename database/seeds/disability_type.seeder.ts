import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Disability_typeEntity } from '../../src/common/entities/disability_type.entity';

export class Disability_typeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Disability_typeEntity);

    const regs = [
      { id: 1, name: 'Ninguna' },
      { id: 2, name: 'Discapacidad fisica permanente' },
      { id: 3, name: 'Discapacidad fisica temporal' },
      { id: 4, name: 'Discapacidad mental permanente' },
      { id: 5, name: 'Discapacidad mental temporal' },
      { id: 6, name: 'Discapacidad neuro-sensorial permanente' },
      { id: 7, name: 'Discapacidad neuro-sensorial temporal' },
    ];

    for (const data of regs) {
      const disabilityType = await repository.findOneBy({ id: data.id });

      if (!disabilityType) {
        await repository.insert([data]);
      }
    }
  }
}
