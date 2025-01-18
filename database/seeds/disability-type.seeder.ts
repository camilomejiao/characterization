import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DisabilityTypeEntity } from '../../src/common/entities/disability-type.entity';

export class DisabilityTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(DisabilityTypeEntity);

    const regs = [
      { id: 1, name: 'Discapacidad fisica permanente' },
      { id: 2, name: 'Discapacidad fisica temporal' },
      { id: 3, name: 'Discapacidad mental permanente' },
      { id: 4, name: 'Discapacidad mental temporal' },
      { id: 5, name: 'Discapacidad neuro-sensorial permanente' },
      { id: 6, name: 'Discapacidad neuro-sensorial temporal' },
    ];

    for (const data of regs) {
      const disabilityType = await repository.findOneBy({ id: data.id });

      if (!disabilityType) {
        await repository.insert([data]);
      }
    }
  }
}
